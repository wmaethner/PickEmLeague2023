import { UserSchema, UsersApi } from "../apis";
import useApi from "./useApi";

export const useGetUsers = async (): Promise<UserSchema[]> => {
  const api = await useApi(UsersApi);
  return (await api.getUserList()).data;
};