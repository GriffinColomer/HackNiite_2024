function createDivvyStop(latitude, longitude, stationName) {
  const stop = {
    latitude: latitude,
    longitude: longitude,
    stationName: stationName
  };
  return stop;
};

function getFilteredDivvyStops(data) {
  const filteredDivvyStops = [];

  for (let i = 0; i < data["data"]["stations"].length; i++) {
    if (data["data"]["stations"][i]["name"].includes("Public") === false) {
      const divvyStop = createDivvyStop(
        data["data"]["stations"][i]["lat"],
        data["data"]["stations"][i]["lon"],
        data["data"]["stations"][i]["name"]
      );
      filteredDivvyStops.push(divvyStop);
    }
  }
  return filteredDivvyStops;
}

export default async function getDivvyStations() {
  const stops = await fetch('https://gbfs.lyft.com/gbfs/2.3/chi/en/station_information.json')
    .then(response => response.json())
    .then(data => {
      return getFilteredDivvyStops(data)
    });
  return stops;
}
