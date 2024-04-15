import React, { useEffect, useRef, useState } from 'react';

const RouteMap = ({ startStation, endStation, stations }) => {
  const mapRef = useRef(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    if (startStation && endStation) {
      const startCoords = stations.find(station => station.stationName === startStation);
      const endCoords = stations.find(station => station.stationName === endStation);

      if (startCoords && endCoords) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: startCoords.latitude, lng: startCoords.longitude },
          zoom: 12,
        });

        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();

        directionsRenderer.setMap(map);

        const request = {
          origin: new window.google.maps.LatLng(startCoords.latitude, startCoords.longitude),
          destination: new window.google.maps.LatLng(endCoords.latitude, endCoords.longitude),
          travelMode: 'BICYCLING',
        };

        directionsService.route(request, (result, status) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(result);
            const route = result.routes[0];
            const distance = route.legs[0].distance.text;
            const duration = route.legs[0].duration.text;
            console.log(`Distance: ${distance}`);
            console.log(`Duration: ${duration}`);
            setDistance(distance);
            setDuration(duration);
          }
        });
      }
    }
  }, [startStation, endStation, stations]);

  return <div>
            <div ref={mapRef} style={{ height: '400px' }} />
            <p>Duration: {duration} Distance: {distance}</p>
          </div>;
};

export default RouteMap;