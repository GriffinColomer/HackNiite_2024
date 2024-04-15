import React, { useState, useEffect } from 'react';
import DivvyMap from './DivvyMap';
import SearchBar from './SearchBar';
import RouteMap from './RouteMap';
import getDivvyStations from './helpers/StationInfo';

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
    window.location.reload()
  };

  return (
    <div>
      <SearchBar
        stations={divvyStations}
        onStartStationChange={setStartStation}
        onEndStationChange={setEndStation}
        startStation={startStation}
        endStation={endStation}
      />
      <div>
        <button onClick={handleShowRouteClick}>Show Route</button>
        <button onClick={handleResetClick}>Reset</button>
      </div>
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
  );
};

export default App;