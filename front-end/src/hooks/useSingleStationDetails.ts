import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getSingleStation } from '../services';

const useSingleStationDetails = () => {
  const [id, setId] = useState<string>('');
  const { data, error, isLoading } = useQuery({
    queryKey: ['single_station', id],
    queryFn: () => getSingleStation(id),
    enabled: id !== '',
  });

  return { data, error, isLoading, setId };
};

export default useSingleStationDetails;
