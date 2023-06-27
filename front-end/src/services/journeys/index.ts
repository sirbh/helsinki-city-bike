import axios from 'axios';
import { IJourneyAPIResponse } from '../../types';

const getJourneyDetails = async (
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

export default getJourneyDetails;
