import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchStation } from '../services/stations';

const useStationSearch = () => {
  const [query, setQuery] = useState<string>('');
  const { data, error, isLoading } = useQuery({
    queryKey: ['journeys', query],
    queryFn: () => searchStation(query),
    enabled: query !== '',
  });

  return { setQuery, data, error, isLoading };
};

export default useStationSearch;
