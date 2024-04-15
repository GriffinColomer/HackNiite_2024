import React, { useState, useEffect } from 'react';
import DivvyMap from './DivvyMap';
import SearchBar from './SearchBar';
import getDivvyStations from './helpers/StationInfo';

const App = () => {
  const [divvyStations, setData] = useState([]);

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

  return (
    <div>
      <SearchBar
        stations={divvyStations}
      />
      <DivvyMap
        stations={divvyStations}
      />
    </div>
  );
};

export default App;