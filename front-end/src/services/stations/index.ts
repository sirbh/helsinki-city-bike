import axios from 'axios';
import {
  IAddStation,
  IDeleteStationType,
  ISearchStation,
  ISingleStationAPIResponse,
  IStation,
  IStationAPIResponse,
} from '../../types';

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
