import axios from 'axios';
import {
  AuthDetails,
  IAddStation,
  IDeleteStationType,
  IJourneyAPIResponse,
  ISearchStation,
  ISingleStationAPIResponse,
  IStation,
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

export const getStations = async (
  page: number,
  take: number,
  username?: string
) => {
  const { data } = await axios.get<IStationAPIResponse>(
    `/api/stations?page=${page}&take=${take}${
      username ? `&username=${username}` : ''
    }`
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

export const addStation = async (addStationDetails: IAddStation) => {
  const { data } = await axios.post<IStation>(
    '/api/stations',
    addStationDetails.newStation,
    {
      headers: { Authorization: `Bearer ${addStationDetails.authToken}` },
    }
  );
  return data;
};

export const deleteStation = async (deleteRequest: IDeleteStationType) => {
  const { data } = await axios.delete(
    `/api/stations/${deleteRequest.stationId}`,
    {
      headers: { Authorization: `Bearer ${deleteRequest.authToken}` },
    }
  );
  return data;
};
