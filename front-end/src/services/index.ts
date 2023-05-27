import axios from 'axios';
import {
  AuthDetails,
  IJourneyAPIResponse,
  ISearchStation,
  ISingleStationAPIResponse,
  IStationAPIResponse,
  LoginAPIResponse,
  User,
} from '../types';

export const getJourneyDetails = async (
  page: number,
  take: number,
  sortBy: string,
  order: string,
  stationId: string,
  journeyType: string
) => {
  const { data } = await axios.get<IJourneyAPIResponse>(
    `/api/journeys?page=${page}&take=${take}&sort_prop=${sortBy}&order=${order}&filter_prop=${journeyType}&id=${stationId}`
  );

  return data;
};

export const searchStation = async (query: string) => {
  const { data } = await axios.get<ISearchStation[]>(
    `/api/stations/search?query=${query}`
  );
  return data;
};

export const getStations = async (page: number, take: number) => {
  const { data } = await axios.get<IStationAPIResponse>(
    `/api/stations?page=${page}&take=${take}`
  );
  return data;
};

export const getSingleStation = async (id: string) => {
  const { data } = await axios.get<ISingleStationAPIResponse>(
    `/api/stations/${id}`
  );
  return data;
};

export interface NewUserResponse {
  id: number;
  name: string;
  username: string;
}

export const createUser = async (newUser: User) => {
  const { data } = await axios.post<NewUserResponse>(
    '/api/auth/register',
    newUser
  );
  return data;
};

export const login = async (authDetails: AuthDetails) => {
  const { data } = await axios.post<LoginAPIResponse>(
    '/api/auth/login',
    authDetails
  );
  return data;
};
