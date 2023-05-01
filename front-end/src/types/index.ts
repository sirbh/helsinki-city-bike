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
