import { UserData, UsersApi } from "../apis";
import useApi from "./useApi";

export const useGetUsers = async (): Promise<UserData[]> => {
  const api = await useApi(UsersApi);
  return (await api.getUserList()).data;
};