
import React from 'react';
import { Link } from 'react-router-dom';
import { Trip } from '../types';
import TripCard from './TripCard';

interface FindRidePageProps {
  trips: Trip[];
}

const FindRidePage: React.FC<FindRidePageProps> = ({ trips }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6" style={{fontFamily: "'Lexend', sans-serif"}}>Caronas Encontradas</h1>
      {trips.length > 0 ? (
        <div className="space-y-4">
          {trips.map(trip => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Nenhuma carona encontrada</h2>
          <p className="text-gray-500 mt-2">
            Tente alterar os filtros da sua busca ou verifique mais tarde.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar para a Busca
          </Link>
        </div>
      )}
    </div>
  );
};

export default FindRidePage;
