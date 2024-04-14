import Select from 'react-select';
import 'react-select/dist/react-select.css';
import React, { useState } from 'react';
import get_divvy_stations from './station_info';


const SearchBar = () => {
  const [startStation, setStartStation] = useState(null);
  const [endStation, setEndStation] = useState(null);

  const divvyStations = get_divvy_stations().map(station => ({
    value: station.station_name,
    label: station.station_name,
  }));

  const handleStartStationChange = (selectedOption) => {
    setStartStation(selectedOption);
  };

  const handleEndStationChange = (selectedOption) => {
    setEndStation(selectedOption);
  };

  return (
    <div>
      <Select
        value={startStation}
        onChange={handleStartStationChange}
        options={divvyStations}
        placeholder="Start Station"
        isDisabled={!divvyStations.length}
      />
      <Select
        value={endStation}
        onChange={handleEndStationChange}
        options={divvyStations.filter(station => station.value !== startStation?.value)}
        placeholder="End Station"
        isDisabled={!divvyStations.length || !startStation}
      />
    </div>
  );
};

export default SearchBar;