import React from 'react';
import get_divvy_stations from './station_info'
import DataPreprocessing from './DataPreprocessing';
import DivvyMap from './DivvyMap';
import SearchBar from './SearchBar';

const App = () => {
  const divvy_stations = get_divvy_stations();
  // console.log(divvy_stations)

    return (
    <div>
      <SearchBar/>
      <DivvyMap
        stations={divvy_stations}
      />
      <DataPreprocessing />
    </div>
    );
};

export default App;