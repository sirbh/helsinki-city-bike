import axios from 'axios';
import { IJourneyAPIResponse } from '../types';

const getJourneyDetails = async (page: number, take: number) => {
  const { data } = await axios.get<IJourneyAPIResponse>(
    `/api/journeys?page=${page}&take=${take}`
  );

  return data;
};

export default getJourneyDetails;
