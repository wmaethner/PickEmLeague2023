import { AuthApi, AuthResult } from "../../apis";
import useApi from "../useApi";

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export const useRegister = async (data: RegisterData): Promise<AuthResult> => {
  const api = await useApi(AuthApi);
  try {
    return await api.postRegisterUser(data);
  } catch (err) {
    console.log(`Use login error: ${err}`);
  }
};