
import React from 'react';
import { APP_NAME } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. Todos os direitos reservados.</p>
        <p className="text-sm mt-2">Lembre-se: Pagamentos são feitos em dinheiro, diretamente ao motorista.</p>
      </div>
    </footer>
  );
};

export default Footer;
