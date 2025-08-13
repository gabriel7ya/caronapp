import React, { useState, useCallback } from 'react';
import { Location } from '../types';
import { LocationIcon } from '../constants';

// A simple debounce function to limit API calls
function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

interface LocationInputProps {
  inputValue: string;
  onInputChange: (text: string) => void;
  onLocationSelect: (location: Location | null) => void;
  placeholder: string;
}

interface NominatimResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: [string, string, string, string];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({ inputValue, onInputChange, onLocationSelect, placeholder }) => {
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&accept-language=pt-BR&countrycodes=br`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: NominatimResult[] = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Failed to fetch location suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchSuggestions, 400), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onInputChange(newValue);
    setShowSuggestions(true);
    if (newValue) {
      debouncedFetch(newValue);
    } else {
      setSuggestions([]);
      onLocationSelect(null);
    }
  };

  const handleSelect = (result: NominatimResult) => {
    const selectedLocation: Location = {
      name: result.display_name,
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
    };
    onLocationSelect(selectedLocation);
    onInputChange(selectedLocation.name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <LocationIcon className="w-5 h-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2 z-10" />
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        onFocus={() => inputValue && fetchSuggestions(inputValue)}
        autoComplete="off"
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
      {showSuggestions && inputValue.length > 0 && (
        <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
          {isLoading && <li className="px-4 py-2 text-gray-500">Buscando...</li>}
          {!isLoading && suggestions.length === 0 && inputValue.length >= 3 && <li className="px-4 py-2 text-gray-500">Nenhum resultado encontrado.</li>}
          {!isLoading && suggestions.map(result => (
            <li
              key={result.place_id}
              onMouseDown={() => handleSelect(result)}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-left text-sm"
            >
              {result.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;
