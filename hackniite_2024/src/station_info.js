import React, { useEffect } from 'react';

const all_divvy_stops = [];

function divvy_stop(latitude, longitude, station_name){
    this.latitude = latitude;
    this.longitude = longitude;
    this.station_name = station_name;
    return this;
  };
  
  function parse_divvy_stops(data) {
    for (let i = 0; i < data["data"]["stations"].length; i++) {
      all_divvy_stops[i] = new divvy_stop(data["data"]["stations"][i]["lat"], data["data"]["stations"][i]["lon"], data["data"]["stations"][i]["name"]);
  }
  }

  function fetch_data() {
    fetch('https://gbfs.lyft.com/gbfs/2.3/chi/en/station_information.json')
        .then(response => response.json())
        .then(data => {
          parse_divvy_stops(data)
        });
  }

export default function get_divvy_stations() {
    // useEffect(() => {
    //     (async() => {
    //       fetch_data();
    //     })();
    //   }, []);
    fetch_data()
      return all_divvy_stops
}
  