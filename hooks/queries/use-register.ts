import { useMutation } from "@tanstack/react-query";
import { register } from "@/services/auth.service";
import { RegisterValidation } from "@/validations/register.validation";
export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterValidation) => register(data),
  });
};
