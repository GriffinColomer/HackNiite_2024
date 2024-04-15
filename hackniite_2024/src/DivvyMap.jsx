import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

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
  const [selectedMarker, setSelectedMarker] = React.useState(null);

  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBF8kUGA8g9S0RsMe6BJkgZb4GS4t6b0aE',
    libraries,
  });

  const renderMap = (stationsRender = []) => {
    return (
      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={11}
          center={loadPosition}
        >
          {stationsRender.map((station, index) => (
            <Marker
              key={index}
              title={station.stationName}
              position={{
                lat: station.latitude,
                lng: station.longitude,
              }}
              onClick={() => setSelectedMarker(station)}
            />
          ))}
          {selectedMarker && (
            <InfoWindow
              position={{
                lat: selectedMarker.latitude,
                lng: selectedMarker.longitude,
              }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <h3>{selectedMarker.stationName}</h3>
              </div>
            </InfoWindow>
          )}
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