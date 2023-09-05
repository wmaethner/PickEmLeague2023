import { AuthApi, AuthModel } from "../../apis";
import useApi from "../useApi";

export const useLogin = async (username: string, password: string): Promise<AuthModel> => {
  const api = await useApi(AuthApi);
  try {
    return await api.postLoginUser({ username, password });
  } catch (err) {
    console.log(`Use login error: ${err}`);
  }
};