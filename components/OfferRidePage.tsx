import React, { useState } from 'react';
import { Trip, Location } from '../types';
import LocationInput from './LocationInput';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !date || !time) {
      alert("Por favor, preencha todos os campos. Origem e destino devem ser selecionados da lista.");
      return;
    }
    onAddTrip({ origin, destination, date, time, seats, price });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: "'Lexend', sans-serif" }}>Oferecer Carona</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="origin" className="block text-sm font-medium text-gray-700">Origem</label>
          <LocationInput
            inputValue={originText}
            onInputChange={setOriginText}
            onLocationSelect={setOrigin}
            placeholder="Saindo de..."
          />
        </div>
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destino</label>
          <LocationInput
            inputValue={destinationText}
            onInputChange={setDestinationText}
            onLocationSelect={setDestination}
            placeholder="Indo para..."
          />
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
  );
};

export default OfferRidePage;
