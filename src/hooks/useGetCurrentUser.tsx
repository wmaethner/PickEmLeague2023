import { User, UsersApi } from "../apis";
import useApi from "./useApi";

export const useGetCurrentUser = async (): Promise<User> => {
  const api = await useApi(UsersApi);
  return await api.getCurrentUser();
};