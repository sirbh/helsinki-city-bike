import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getStations } from '../services';

const useStationDetails = () => {
  const [page, setPage] = useState<number>(1);
  const take = 10;
  const [username, setUsername] = useState<string>();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['stations', page, username],
    queryFn: () => getStations(page, take, username),
  });

  return { data, isError, isLoading, page, setPage, setUsername };
};

export default useStationDetails;
