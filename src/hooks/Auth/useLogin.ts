import { useMutation } from '@tanstack/react-query';

import { AuthenticationService } from '../../service/AuthServices';
import { TAuthLoginRequest } from '../../types/hooksTypes/authType';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: TAuthLoginRequest) =>
      await AuthenticationService.login(data),
  });
};
