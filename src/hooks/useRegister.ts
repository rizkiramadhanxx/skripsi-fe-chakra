import { AuthenticationService } from '@/service/AuthService';
import { TLoginForm, TRegisterForm } from '@/types/form';
import { useMutation } from '@tanstack/react-query';

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: TRegisterForm) =>
      await AuthenticationService.register(data),
  });
};
