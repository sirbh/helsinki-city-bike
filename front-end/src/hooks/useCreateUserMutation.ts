import { useMutation } from '@tanstack/react-query';
import { createUser } from '../services';

const useCreateUserMutation = () =>
  //   onError: (error: unknown) => void,
  //   onSuccess: (data: NewUserResponse) => void
  {
    const { mutate, isLoading } = useMutation({
      mutationFn: createUser,
      // onError,
      // onSuccess,
    });

    return { mutate, isLoading };
  };

export default useCreateUserMutation;
