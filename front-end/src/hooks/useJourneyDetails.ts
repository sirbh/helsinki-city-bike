import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getJourneyDetails } from '../services/index';

const useJourneyDetails = () => {
  const [page, setPage] = useState<number>(1);
  const [take, setTake] = useState<number>(10);
  const { data, error, isLoading } = useQuery(['journeys', page, take], () =>
    getJourneyDetails(page, 10)
  );

  return { page, setPage, data, error, isLoading, take };
};

export default useJourneyDetails;
