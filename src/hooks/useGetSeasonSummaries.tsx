import { SummariesApi, SummarySchema } from "../apis";
import useApi from "./useApi";

export const useGetSeasonSummaries = async (): Promise<SummarySchema[]> => {
  const api = await useApi(SummariesApi);
  return (await api.getSeasonSummary()).data;
};