import { useMutation } from '@tanstack/react-query';
import { createUser } from '../services/users';

const useCreateUserMutation = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createUser,
  });

  return { mutate, isLoading };
};

export default useCreateUserMutation;
