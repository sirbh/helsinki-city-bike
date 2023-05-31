import { useMutation } from '@tanstack/react-query';
import { deleteStation } from '../services';

const useDeleteStationMutation = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteStation,
  });

  return { mutate, isLoading };
};

export default useDeleteStationMutation;
