import React, { useState, useEffect } from 'react';
import DivvyMap from './DivvyMap';
import SearchBar from './SearchBar';
import RouteMap from './RouteMap';
import getDivvyStations from './helpers/StationInfo';
import './App.css'; // Import the CSS file for styling

const App = () => {
  const [divvyStations, setData] = useState([]);
  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  const [showRoute, setShowRoute] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const divvyStations = await getDivvyStations();
        setData(divvyStations);
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };
    fetchData();
  }, []);

  const handleShowRouteClick = () => {
    setShowRoute(true);
  };

  const handleResetClick = () => {
    setStartStation('');
    setEndStation('');
    setShowRoute(false);
    window.location.reload();
  };

  return (
    <div className="app">
      <h1 className="app-title">Divvy Station Route Planner</h1>
      <div className="search-container">
        <SearchBar
          stations={divvyStations}
          onStartStationChange={setStartStation}
          onEndStationChange={setEndStation}
          startStation={startStation}
          endStation={endStation}
        />
        <div className="button-container">
          <button className="button" onClick={handleShowRouteClick}>
            Show Route
          </button>
          <button className="button" onClick={handleResetClick}>
            Reset
          </button>
        </div>
      </div>
      <div className="map-container">
        {showRoute ? (
          <RouteMap
            startStation={startStation}
            endStation={endStation}
            stations={divvyStations}
          />
        ) : (
          <DivvyMap stations={divvyStations} />
        )}
      </div>
    </div>
  );
};

export default App;