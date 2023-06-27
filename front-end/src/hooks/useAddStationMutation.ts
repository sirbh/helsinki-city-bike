import { useMutation } from '@tanstack/react-query';
import { addStation } from '../services/stations';

const useAddStationMutation = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: addStation,
  });

  return { mutate, isLoading };
};

export default useAddStationMutation;
