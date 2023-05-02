import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import getJourneyDetails from '../services';

const useJourneyDetails = () => {
  const [page, setPage] = useState<number>(1);
  const take = 10; // number of item to show per page
  const [order, setOrder] = useState<string>('asc');
  const [sortBy, setSortBy] = useState<string>('departure_station_name');

  const { data, error, isLoading } = useQuery({
    queryKey: ['journeys', page, order, sortBy],
    queryFn: () => getJourneyDetails(page, take, sortBy, order),
  });

  return { page, setPage, data, error, isLoading, take, setOrder, setSortBy };
};

export default useJourneyDetails;
