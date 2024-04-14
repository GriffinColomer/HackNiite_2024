import React from 'react';

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '50vh',
};
const loadPosition = {
  lat: 41.8781,
  lng: -87.6298
};

const DivvyMap = () => {

  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBF8kUGA8g9S0RsMe6BJkgZb4GS4t6b0aE',
    libraries,
  });

  const renderMap = () => {
    // const onLoad = React.useCallback(
    //   function onLoad(mapInstance) {
    //     // do something with map Instance
    //   }
    // )

    // Render the preprocessed data
    return (
      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={11}
          center={loadPosition}
        >
          <Marker
            position={loadPosition}
            title='Chicago'
          />
        </GoogleMap>
      </div>
    );
  };

  if (loadError) {
    return <div>Error loading maps.</div>;
  }

  return isLoaded ? renderMap() : <div></div>;
};

export default DivvyMap;