import { UserResult, UsersApi } from "../apis";
import useApi from "./useApi";

export const useGetCurrentUser = async (): Promise<UserResult> => {
  const api = await useApi(UsersApi);
  return await api.getCurrentUser();
};