import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getStations } from '../services';

const useStationDetails = () => {
  const [page, setPage] = useState<number>(1);
  const take = 10;

  const { data, isError, isLoading } = useQuery({
    queryKey: ['stations', page],
    queryFn: () => getStations(page, take),
  });

  return { data, isError, isLoading, page, setPage };
};

export default useStationDetails;
