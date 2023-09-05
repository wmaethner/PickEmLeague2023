import { UserModel, UsersApi } from "../apis";
import useApi from "./useApi";

export const useGetCurrentUser = async (): Promise<UserModel> => {
  const api = await useApi(UsersApi);
  return await api.getCurrentUser();
};