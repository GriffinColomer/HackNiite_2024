import React, { useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

function divvy_stop(latitude, longitude, station_name){
  this.latitude = latitude;
  this.longitude = longitude;
  this.station_name = station_name;
  return this;
};
const all_divvy_stops = [];

function parse_divvy_stops(data) {
  for (let i = 0; i < data["data"]["stations"].length; i++) {
    all_divvy_stops[i] = new divvy_stop(data["data"]["stations"][i]["lat"], data["data"]["stations"][i]["lon"], data["data"]["stations"][i]["name"]);
}
}

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262 // default longitude
};

const App = () => {
  function fetch_data() {
    fetch('https://gbfs.lyft.com/gbfs/2.3/chi/en/station_information.json')
        .then(response => response.json())
        .then(data => {
          parse_divvy_stops(data)
        });
    console.log(all_divvy_stops)
  }

  useEffect(() => {
    (async() => {
      fetch_data();
    })();
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBF8kUGA8g9S0RsMe6BJkgZb4GS4t6b0aE',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default App;