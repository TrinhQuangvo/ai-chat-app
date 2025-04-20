import { axiosInstance } from "@/axios";
import { RegisterValidation } from "@/validations/register.validation";

export const register = async (payload: RegisterValidation) => {
  try {
    const response = await axiosInstance.post("/register", payload);
    return response.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
