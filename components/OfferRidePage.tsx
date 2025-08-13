import React, { useState, useEffect } from 'react';
import { Trip, Location } from '../types';
import LocationInput from './LocationInput';
import MapPicker, { getCurrentBrowserLocation } from './MapPicker';
import { MapPinIcon } from '../constants';

interface OfferRidePageProps {
  onAddTrip: (newTrip: Omit<Trip, 'id' | 'driver'>) => void;
}

const OfferRidePage: React.FC<OfferRidePageProps> = ({ onAddTrip }) => {
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [originText, setOriginText] = useState('');
  const [destinationText, setDestinationText] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [seats, setSeats] = useState(1);
  const [price, setPrice] = useState(0);
  const [activeMap, setActiveMap] = useState<'origin' | 'destination' | null>(null);

  useEffect(() => {
    setOriginText('Obtendo localização atual...');
    getCurrentBrowserLocation()
      .then(location => {
        if (location) {
          setOrigin(location);
          setOriginText(location.name);
        } else {
          setOriginText('');
        }
      })
      .catch(error => {
        console.warn("Não foi possível obter a localização: ", error.message);
        setOriginText(''); // Limpa o texto em caso de erro, permitindo inserção manual.
      });
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !date || !time) {
      alert("Por favor, preencha todos os campos. Origem e destino devem ser selecionados da lista ou no mapa.");
      return;
    }
    onAddTrip({ origin, destination, date, time, seats, price });
  };

  const handleLocationChange = (location: Location) => {
    if (activeMap === 'origin') {
      setOrigin(location);
      setOriginText(location.name);
    } else if (activeMap === 'destination') {
      setDestination(location);
      setDestinationText(location.name);
    }
    setActiveMap(null);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: "'Lexend', sans-serif" }}>Oferecer Carona</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">Origem</label>
            <div className="flex items-center gap-2">
              <div className="flex-grow">
                <LocationInput
                  inputValue={originText}
                  onInputChange={setOriginText}
                  onLocationSelect={setOrigin}
                  placeholder="Saindo de..."
                />
              </div>
              <button type="button" onClick={() => setActiveMap('origin')} title="Selecionar no mapa" className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                <MapPinIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
            <div className="flex items-center gap-2">
              <div className="flex-grow">
                <LocationInput
                  inputValue={destinationText}
                  onInputChange={setDestinationText}
                  onLocationSelect={setDestination}
                  placeholder="Indo para..."
                />
              </div>
              <button type="button" onClick={() => setActiveMap('destination')} title="Selecionar no mapa" className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                <MapPinIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data da Viagem</label>
              <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Horário de Saída</label>
              <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="seats" className="block text-sm font-medium text-gray-700">Vagas disponíveis</label>
              <input type="number" id="seats" value={seats} min="1" max="6" onChange={e => setSeats(Number(e.target.value))} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço por passageiro (R$)</label>
              <input type="number" id="price" value={price} min="0" step="1" onChange={e => setPrice(Number(e.target.value))} placeholder="Deixe 0 para carona grátis" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md" role="alert">
            <p className="font-bold">Aviso Importante</p>
            <p>Este aplicativo não processa pagamentos. O valor definido é uma sugestão a ser paga em dinheiro diretamente a você pelo passageiro.</p>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg transform hover:scale-105">
            Publicar Carona
          </button>
        </form>
      </div>

      {activeMap && (
        <MapPicker
          initialLocation={activeMap === 'origin' ? origin : destination}
          onLocationChange={handleLocationChange}
          onClose={() => setActiveMap(null)}
        />
      )}
    </>
  );
};

export default OfferRidePage;
