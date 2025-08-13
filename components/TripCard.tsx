import React from 'react';
import { Trip } from '../types';
import { CalendarIcon, LocationIcon, MoneyIcon, UsersIcon } from '../constants';

interface TripCardProps {
  trip: Trip;
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  const { origin, destination, date, time, price, seats, driver } = trip;

  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-[1.02]">
      <div className="md:flex">
        <div className="md:flex-shrink-0 p-4 flex md:flex-col items-center justify-center bg-gray-50 md:border-r">
          <img className="h-16 w-16 rounded-full object-cover" src={driver.avatarUrl} alt={`Foto de ${driver.name}`} />
          <div className="mt-0 md:mt-2 text-center md:text-left ml-4 md:ml-0">
            <p className="font-semibold text-gray-800">{driver.name}</p>
            <p className="text-sm text-yellow-500">★ {driver.rating.toFixed(1)}</p>
          </div>
        </div>
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <div className="flex items-center text-sm text-gray-600">
                <LocationIcon className="w-4 h-4 mr-2 text-blue-500" />
                <p><span className="font-semibold">De:</span> {origin.name}</p>
              </div>
              <div className="my-2 border-l-2 border-dotted border-gray-300 h-6 ml-[7px]"></div>
              <div className="flex items-center text-sm text-gray-600">
                <LocationIcon className="w-4 h-4 mr-2 text-green-500" />
                <p><span className="font-semibold">Para:</span> {destination.name}</p>
              </div>
            </div>
            <div className="text-right ml-4">
              <p className="text-2xl font-bold text-blue-600">
                {price > 0 ? `R$${price.toFixed(2).replace('.', ',')}` : 'Grátis'}
              </p>
              <p className="text-xs text-gray-500">por pessoa</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2 text-gray-500" />
              <span>{formattedDate} às {time}</span>
            </div>
            <div className="flex items-center">
              <UsersIcon className="w-4 h-4 mr-2 text-gray-500" />
              <span>{seats} vaga{seats > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
        <div className="p-4 flex items-center justify-center bg-gray-50">
          <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-sm w-full md:w-auto">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
