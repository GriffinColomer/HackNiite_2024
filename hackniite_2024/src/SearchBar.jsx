import React, { useState } from 'react';
import './SearchBar.css'; // Import your CSS file

const SearchBar = ({ stations = [] }) => {
  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleStartStationChange = (event) => {
    const { value } = event.target;
    setStartStation(value);
    filterSuggestions(value, setSuggestions);
  };

  const handleEndStationChange = (event) => {
    const { value } = event.target;
    setEndStation(value);
    filterSuggestions(value, setSuggestions);
  };

  const filterSuggestions = (value, setSuggestionsCallback) => {
    const filteredSuggestions = stations.filter(station =>
      station.stationName.toLowerCase().includes(value.toLowerCase())
    );
    const names = filteredSuggestions.map(x => x.stationName);
    setSuggestionsCallback(names);
  };

  return (
    <div className="search-bar-container">
      <div className="input-container">
        <input
          type="text"
          value={startStation}
          onChange={handleStartStationChange}
          placeholder="Start Station"
          list="suggestions"
          className="search-input"
        />
        <datalist id="suggestions">
          {suggestions.map((suggestion, index) => (
            <option key={index} value={suggestion} />
          ))}
        </datalist>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={endStation}
          onChange={handleEndStationChange}
          placeholder="End Station"
          list="suggestions"
          className="search-input"
          disabled={!startStation}
        />
      </div>
    </div>
  );
};

export default SearchBar;