import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Trip, SearchCriteria, Location } from './types';
import { MOCK_TRIPS } from './data/mockData';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import FindRidePage from './components/FindRidePage';
import OfferRidePage from './components/OfferRidePage';

function App() {
  const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const navigate = useNavigate();

  const handleSearch = (criteria: SearchCriteria) => {
    const results = trips.filter(trip => {
      if (!criteria.origin || !criteria.destination) return false;

      // For simplicity, we are checking if the trip's location name includes the searched location name.
      // A more advanced search could use the coordinates to find trips within a certain radius.
      const originMatch = trip.origin.name.toLowerCase().includes(criteria.origin.name.toLowerCase());
      const destinationMatch = trip.destination.name.toLowerCase().includes(criteria.destination.name.toLowerCase());

      const dateMatch = !criteria.date || trip.date === criteria.date;
      return originMatch && destinationMatch && dateMatch;
    });
    setFilteredTrips(results);
    navigate('/find');
  };

  const handleAddTrip = (newTrip: Omit<Trip, 'id' | 'driver'>) => {
    const tripWithId: Trip = {
      ...newTrip,
      id: `trip-${Date.now()}`,
      driver: { // Mock driver for new trips
        id: 'user-0',
        name: 'Você',
        avatarUrl: 'https://picsum.photos/seed/you/100/100',
        rating: 5,
      }
    };
    setTrips(prevTrips => [tripWithId, ...prevTrips]);
    alert('Carona oferecida com sucesso!');
    navigate('/');
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage onSearch={handleSearch} />} />
          <Route path="/find" element={<FindRidePage trips={filteredTrips} />} />
          <Route path="/offer" element={<OfferRidePage onAddTrip={handleAddTrip} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
