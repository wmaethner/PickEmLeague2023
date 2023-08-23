import { Team, TeamsApi } from "../apis";
import useApi from "./useApi";

export const useGetTeams = async (): Promise<Team[]> => {
  const api = await useApi(TeamsApi);
  return await api.getTeamList();
};