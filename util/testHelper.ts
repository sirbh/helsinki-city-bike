import { journeys, stations } from "./helperdata";

export const getStationDetailsByID = (id: number) => {
  const station = stations.find((station) => station.id === id);
  return station;
};

export const getJourneyStarting = (id: number) => {
  const journeysCount = journeys.filter(
    (journey) => journey.departure_station_id === id
  ).length;
  return journeysCount;
};

export const getJourneyEnding = (id: number) => {
  const journeyCount = journeys.filter(
    (journey) => journey.return_station_id === id
  ).length;
  return journeyCount;
};

export const getAvgDistanceStartingFromStation = (id: number) => {
  const stations = journeys.filter(
    (journey) => journey.departure_station_id === id
  );
  if (stations.length === 0) {
    return 0;
  }
  const distance = stations
    .map((journey) => journey.covered_distance)
    .reduce((a, b) => a + b, 0);

  return distance / stations.length;
};

export const getAvgDistanceEndingOnStation = (id: number) => {
  const stations = journeys.filter(
    (journey) => journey.return_station_id === id
  );
  if (stations.length === 0) {
    return 0;
  }
  const distance = stations
    .map((journey) => journey.covered_distance)
    .reduce((a, b) => a + b, 0);

  return distance / stations.length;
};

export const getPopularReturnStation = (id: number) => {
  const stations = journeys.filter(
    (journey) => journey.departure_station_id === id
  );

  if (stations.length === 0) {
    return [];
  }

  const returnStationWithCount: {
    id: number;
    name: string;
    count: number;
  }[] = [];
  stations.forEach((station) => {
    const id = station.return_station_id;
    const index = returnStationWithCount.findIndex(
      (station) => station.id === id
    );
    if (index < 0) {
      returnStationWithCount.push({
        id: id,
        name: station.return_station_name,
        count: 1,
      });
    } else {
      returnStationWithCount[index].count =
        returnStationWithCount[index].count + 1;
    }
  });

  returnStationWithCount.sort((a, b) => b.count - a.count);

  if (returnStationWithCount.length <= 5) {
    return returnStationWithCount;
  }

  return returnStationWithCount.slice(0, 5);
};

export const getPopularDepartureStation = (id: number) => {
  const stations = journeys.filter(
    (journey) => journey.return_station_id === id
  );

  if (stations.length === 0) {
    return [];
  }

  const departureStationWithCount: {
    id: number;
    name: string;
    count: number;
  }[] = [];
  stations.forEach((station) => {
    const id = station.departure_station_id;
    const index = departureStationWithCount.findIndex(
      (station) => station.id === id
    );
    if (index < 0) {
      departureStationWithCount.push({
        id: id,
        name: station.departure_station_name,
        count: 1,
      });
    } else {
      departureStationWithCount[index].count =
        departureStationWithCount[index].count + 1;
    }
  });

  departureStationWithCount.sort((a, b) => b.count - a.count);

  if (departureStationWithCount.length <= 5) {
    return departureStationWithCount;
  }

  return departureStationWithCount.slice(0, 5);
};
