import { useMutation } from '@tanstack/react-query';
import { login } from '../services/users';

const useLoginMutation = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: login,
  });

  return { mutate, isLoading };
};

export default useLoginMutation;
