import { useMutation } from '@tanstack/react-query';
import { deleteStation } from '../services/stations';

const useDeleteStationMutation = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteStation,
  });

  return { mutate, isLoading };
};

export default useDeleteStationMutation;
