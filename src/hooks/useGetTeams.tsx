import { TeamListModel, TeamsApi } from "../apis";
import useApi from "./useApi";

export const useGetTeams = async (): Promise<TeamListModel> => {
  const api = await useApi(TeamsApi);
  return await api.getTeamList();
};