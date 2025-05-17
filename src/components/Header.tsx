import React from 'react';
import { MapPin } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-green-700 to-green-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">LandPredictor</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="hover:text-green-200 transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-green-200 transition-colors">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-green-200 transition-colors">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;