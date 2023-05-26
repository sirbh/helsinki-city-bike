export interface IJourney {
  id: number;
  departure: string;
  return: string;
  departure_station_id: number;
  departure_station_name: string;
  return_station_id: number;
  return_station_name: string;
  covered_distance: number;
  duration: number;
}

export interface IJourneyAPIResponse {
  count: number;
  details: IJourney[];
}

export interface ITabsState {
  name: string;
  value: string;
  order: string;
}

export interface ISearchStation {
  id: number;
  name: string;
}

export interface IStation {
  id: number;
  name: string;
  address: string;
  operator: string;
  city: string;
  capacity: number;
  x: number;
  y: number;
}

export interface IStationAPIResponse {
  details: IStation[];
  count: number;
}

export type SelectOption = {
  name: string;
  value: string;
};

export interface ISingleStationAPIResponse {
  details: IStation;
  total_departures: number;
  total_return: number;
  avg_departure_distance: number;
  avg_return_distance: number;
  popular_departure_stations: {
    _count: {
      return_station_id: number;
    };
    departure_station_id: number;
    departure_station_name: string;
  }[];
  popular_return_station: {
    _count: {
      departure_station_id: number;
    };
    return_station_id: number;
    return_station_name: string;
  }[];
}

export interface User {
  name: string;
  username: string;
  password: string;
}

export interface Message {
  type: 'error' | 'success' | 'info';
  message: string;
}
