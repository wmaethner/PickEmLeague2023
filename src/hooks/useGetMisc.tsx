import { MiscApi, MiscSchema } from "../apis";
import useApi from "./useApi";

export const useGetMisc = async (): Promise<MiscSchema> => {
  const api = await useApi(MiscApi);
  return (await api.getMiscInfo()).data;
};