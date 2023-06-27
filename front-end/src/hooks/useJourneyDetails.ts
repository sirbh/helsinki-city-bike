import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import getJourneyDetails from '../services/journeys';

const useJourneyDetails = () => {
  const [page, setPage] = useState<number>(1);
  const take = 10; // number of item to show per page
  const [order, setOrder] = useState<string>('asc');
  const [sortBy, setSortBy] = useState<string>('departure_station_name');
  const [stationId, setStationId] = useState<string>('');
  const [journeyType, setJourneyType] = useState<string>(
    'departure_station_id'
  );

  const { data, error, isLoading } = useQuery({
    queryKey: ['journeys', page, order, sortBy, stationId, journeyType],
    queryFn: () =>
      getJourneyDetails(page, take, sortBy, order, stationId, journeyType),
  });

  return {
    page,
    data,
    error,
    isLoading,
    take,
    journeyType,
    setOrder,
    setSortBy,
    setPage,
    setStationId,
    setJourneyType,
  };
};

export default useJourneyDetails;
