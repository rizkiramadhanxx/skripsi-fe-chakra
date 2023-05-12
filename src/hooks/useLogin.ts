import { AuthenticationService } from '@/service/AuthService';
import { TLoginForm } from '@/types/form';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: TLoginForm) =>
      await AuthenticationService.login(data),
  });
};
