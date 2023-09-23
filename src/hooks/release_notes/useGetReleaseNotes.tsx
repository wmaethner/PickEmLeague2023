import { ReleaseNotesApi, ReleaseNotesSchema } from "../../apis";
import useApi from "../useApi";

export const useGetReleaseNotes = async (): Promise<ReleaseNotesSchema[]> => {
  const api = await useApi(ReleaseNotesApi);
  return (await api.getReleaseNotesList()).data;
};