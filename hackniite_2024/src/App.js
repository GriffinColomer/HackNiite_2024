import React from 'react';
import get_divvy_stations from './station_info'
import DataPreprocessing from './DataPreprocessing';
import DivvyMap from './DivvyMap';

const App = () => {
  get_divvy_stations();
  // console.log(divvy_stations)

    return (
    <div>
      <DivvyMap />
      <DataPreprocessing />
    </div>
    );
};

export default App;