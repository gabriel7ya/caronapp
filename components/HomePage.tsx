import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchCriteria, Location } from '../types';
import { CalendarIcon } from '../constants';
import LocationInput from './LocationInput';

interface HomePageProps {
  onSearch: (criteria: SearchCriteria) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSearch }) => {
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [originText, setOriginText] = useState('');
  const [destinationText, setDestinationText] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination) {
      alert('Por favor, selecione uma origem e um destino da lista de sugestões.');
      return;
    }
    onSearch({ origin, destination, date });
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Lexend', sans-serif" }}>
          Para onde vamos hoje?
        </h1>
        <p className="text-gray-600 mb-8">
          Encontre ou ofereça caronas de forma fácil e segura.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <LocationInput
            inputValue={originText}
            onInputChange={setOriginText}
            onLocationSelect={setOrigin}
            placeholder="Saindo de..."
          />
          <LocationInput
            inputValue={destinationText}
            onInputChange={setDestinationText}
            onLocationSelect={setDestination}
            placeholder="Indo para..."
          />
          <div className="relative">
            <CalendarIcon className="w-5 h-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Procurar Carona
          </button>
        </form>
      </div>
      <div className="mt-8">
        <p className="text-gray-700">Ou vai dirigir?</p>
        <button
          onClick={() => navigate('/offer')}
          className="mt-2 font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          Clique aqui para oferecer uma carona
        </button>
      </div>
    </div>
  );
};

export default HomePage;
