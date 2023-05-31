import { useMutation } from '@tanstack/react-query';
import { addStation } from '../services';

const useAddStationMutation = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: addStation,
  });

  return { mutate, isLoading };
};

export default useAddStationMutation;
