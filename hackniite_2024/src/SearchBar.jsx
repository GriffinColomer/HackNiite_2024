import React, { useState } from 'react';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './SearchBar.css';

const SearchBar = ({ stations = [], onStartStationChange, onEndStationChange, startStation, endStation, selectedTime, setSelectedTime}) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleStartStationChange = (event) => {
    const { value } = event.target;
    filterSuggestions(value, setSuggestions);
    onStartStationChange(value);
  };

  const handleEndStationChange = (event) => {
    const { value } = event.target;
    filterSuggestions(value, setSuggestions);
    onEndStationChange(value);
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
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileTimePicker
              className='time-picker'
              value={selectedTime}
              onChange={setSelectedTime}/>
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default SearchBar;