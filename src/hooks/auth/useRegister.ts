import { AuthApi, AuthModel } from "../../apis";
import useApi from "../useApi";

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export const useRegister = async (data: RegisterData): Promise<AuthModel> => {
  const api = await useApi(AuthApi);
  try {
    return await api.postRegisterUser(data);
  } catch (err) {
    console.log(`Use login error: ${err}`);
  }
};