import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import getJourneyDetails from '../services';

const useJourneyDetails = () => {
  const [page, setPage] = useState<number>(1);
  const take = 10; // number of item to show per page
  const { data, error, isLoading } = useQuery(['journeys', page, take], () =>
    getJourneyDetails(page, 10)
  );

  return { page, setPage, data, error, isLoading, take };
};

export default useJourneyDetails;
