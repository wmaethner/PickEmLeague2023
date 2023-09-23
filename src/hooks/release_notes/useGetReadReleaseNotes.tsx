import { ReadIds, ReleaseNotesApi } from "../../apis";
import useApi from "../useApi";

export const useGetReadReleaseNotes = async (): Promise<ReadIds> => {
  const api = await useApi(ReleaseNotesApi);
  return (await api.getReleaseNotesReads()).data;
};