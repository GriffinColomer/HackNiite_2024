function createDivvyStop(latitude, longitude, stationName, stationID) {
  const stop = {
    latitude: latitude,
    longitude: longitude,
    stationName: stationName,
    stationID: stationID
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
        data["data"]["stations"][i]["name"],
        data["data"]["stations"][i]["station_id"]
      );
      filteredDivvyStops.push(divvyStop);
    }
  }
  return filteredDivvyStops;
}

function addCurrentBikeCount(data, stationList) {
  var stations = stationList
  for (let j = 0; j < data["data"]["stations"].length; j++) {
    let obj = stationList.find((o, i) => {
      if (o.name === data["data"]["stations"][j]["station_id"]) {
        stations[i].remainingBikes = data["data"]["stations"][j]["num_bikes_available"];
        return true; // stop searching
      }
    });
  }
  return stations;
}

export default async function getDivvyStations() {
  const stops = await fetch('https://gbfs.lyft.com/gbfs/2.3/chi/en/station_information.json')
    .then(response => response.json())
    .then(data => {
      return getFilteredDivvyStops(data)
    });

  const stopsInfo = await fetch('https://gbfs.lyft.com/gbfs/2.3/chi/en/station_status.json')
  .then(response => response.json())
  .then(data => {
    return addCurrentBikeCount(data, stops)
  });

  return stopsInfo;
}
