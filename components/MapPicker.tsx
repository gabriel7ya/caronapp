import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { Location } from '../types';
import L from 'leaflet';

// Corrige um problema comum com o ícone padrão do Leaflet em bundlers modernos
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

/**
 * Converte coordenadas geográficas em um nome de endereço legível.
 * @param latlng Objeto LatLng do Leaflet.
 * @returns O nome do local (display_name) do Nominatim.
 */
export const reverseGeocode = async (latlng: LatLng): Promise<string> => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}&accept-language=pt-BR`);
    if (!response.ok) throw new Error("A resposta da rede não foi bem-sucedida");
    const data = await response.json();
    if (data && data.display_name) {
      return data.display_name;
    }
    throw new Error('Endereço não encontrado');
  } catch (error) {
    console.error("Erro na geocodificação reversa:", error);
    throw new Error('Não foi possível obter o endereço.');
  }
};

/**
 * Obtém a localização atual do usuário através da API de Geolocalização do navegador.
 * @returns Uma Promise que resolve com um objeto Location ou é rejeitada com um erro.
 */
export const getCurrentBrowserLocation = (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Geolocalização não é suportada por este navegador.'));
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const latlng = new LatLng(latitude, longitude);
        try {
          const name = await reverseGeocode(latlng);
          resolve({ name, lat: latitude, lng: longitude });
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        let errorMessage = 'Ocorreu um erro ao obter a localização.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Você negou a permissão para geolocalização.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Informações de localização não estão disponíveis.";
            break;
          case error.TIMEOUT:
            errorMessage = "A requisição para obter a localização expirou.";
            break;
        }
        reject(new Error(errorMessage));
      }
    );
  });
};


interface MapPickerProps {
  initialLocation: Location | null;
  onLocationChange: (location: Location) => void;
  onClose: () => void;
}

// Componente para recentralizar o mapa quando a localização inicial muda
const MapRecenterer = ({ center }: { center: LatLng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom() < 13 ? 13 : map.getZoom());
  }, [center, map]);
  return null;
}

const MapEventsHandler = ({ onPositionChange }: { onPositionChange: (latlng: LatLng) => void }) => {
  useMapEvents({
    click(e) {
      onPositionChange(e.latlng);
    },
  });
  return null;
};

const DraggableMarker = ({ position, onPositionChange }: { position: LatLng, onPositionChange: (latlng: LatLng) => void }) => {
  const markerRef = useRef<L.Marker>(null);
  const eventHandlers = useMemo(() => ({
    dragend() {
      const marker = markerRef.current;
      if (marker) {
        onPositionChange(marker.getLatLng());
      }
    },
  }), [onPositionChange]);

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
};


const MapPicker: React.FC<MapPickerProps> = ({ initialLocation, onLocationChange, onClose }) => {
  const defaultCenter = useMemo(() => new LatLng(-14.235, -51.925), []); // Centro do Brasil
  const [position, setPosition] = useState<LatLng>(initialLocation ? new LatLng(initialLocation.lat, initialLocation.lng) : defaultCenter);
  const [locationName, setLocationName] = useState<string | null>(initialLocation?.name || null);
  const [isGeocoding, setIsGeocoding] = useState(false);

  const fetchAndSetLocationName = useCallback(async (latlng: LatLng) => {
    setIsGeocoding(true);
    setLocationName("Buscando endereço...");
    try {
      const name = await reverseGeocode(latlng);
      setLocationName(name);
    } catch (error: any) {
      console.error("Erro na geocodificação reversa:", error);
      setLocationName(error.message || 'Não foi possível obter o endereço.');
    } finally {
      setIsGeocoding(false);
    }
  }, []);

  useEffect(() => {
    if (initialLocation) {
      const newPos = new LatLng(initialLocation.lat, initialLocation.lng);
      setPosition(newPos);
      setLocationName(initialLocation.name);
    } else {
      fetchAndSetLocationName(defaultCenter);
    }
  }, [initialLocation, fetchAndSetLocationName, defaultCenter]);

  const handlePositionChange = (newLatLng: LatLng) => {
    setPosition(newLatLng);
    fetchAndSetLocationName(newLatLng);
  };

  const handleConfirm = () => {
    if (position && locationName && !isGeocoding && locationName !== 'Não foi possível obter o endereço.') {
      onLocationChange({
        name: locationName,
        lat: position.lat,
        lng: position.lng,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl flex flex-col" style={{ height: '90vh' }}>
        <header className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Lexend', sans-serif" }}>Selecione no Mapa</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </header>
        <div className="flex-grow relative">
          <MapContainer center={position} zoom={initialLocation ? 15 : 5} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <DraggableMarker position={position} onPositionChange={handlePositionChange} />
            <MapEventsHandler onPositionChange={handlePositionChange} />
            <MapRecenterer center={position} />
          </MapContainer>
        </div>
        <footer className="p-4 bg-gray-50 border-t">
          <div className="mb-3">
            <p className="text-sm font-semibold text-gray-600">Localização Selecionada:</p>
            <p className="text-gray-800 h-10 flex items-center">{isGeocoding ? 'Buscando...' : locationName || 'Mova o mapa para encontrar um endereço.'}</p>
          </div>
          <button
            onClick={handleConfirm}
            disabled={isGeocoding || !locationName || locationName === 'Não foi possível obter o endereço.'}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isGeocoding ? 'Aguarde...' : 'Confirmar Localização'}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default MapPicker;
