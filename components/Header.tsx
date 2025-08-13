
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME, CarIcon } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600" style={{fontFamily: "'Lexend', sans-serif"}}>
          <CarIcon className="w-8 h-8"/>
          <span>{APP_NAME}</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
            Procurar Carona
          </Link>
          <Link
            to="/offer"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-semibold"
          >
            Oferecer Carona
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
