import { ReleaseNotesApi } from "../../apis";
import useApi from "../useApi";

export const useReadReleaseNote = async (id: number): Promise<void> => {
  const api = await useApi(ReleaseNotesApi);
  return (await api.postReleaseNotesRead({ id }));
};