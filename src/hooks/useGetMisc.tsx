import { MiscApi, MiscData } from "../apis";
import useApi from "./useApi";

export const useGetMisc = async (): Promise<MiscData> => {
  const api = await useApi(MiscApi);
  return (await api.getMiscInfo()).data;
};