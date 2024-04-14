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

const DivvyMap = ({ stations = [] }) => {

  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBF8kUGA8g9S0RsMe6BJkgZb4GS4t6b0aE',
    libraries,
  });

  const renderMap = (stations = []) => {
    // const onLoad = React.useCallback(
    //   function onLoad(mapInstance) {
    //     // do something with map Instance
    //   }
    // )

    const markers = []; // Create an empty array to store ListItem

    stations.forEach((station) => {
      const markerPosition = {
        lat: station.latitude,
        lng: station.longitude,
      };
      markers.push(<Marker position={markerPosition} title={station.station_name} />);
    });

    // Render the preprocessed data
    return (
      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={11}
          center={loadPosition}
        >
          {markers}
        </GoogleMap>
      </div>
    );
  };

  if (loadError) {
    return <div>Error loading maps.</div>;
  }

  return isLoaded ? renderMap(stations) : <div></div>;
};

export default DivvyMap;