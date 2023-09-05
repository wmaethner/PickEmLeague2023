import { GamePickSchema, GamePicksApi } from "../apis";
import useApi from "./useApi";

export const useGetGamePicks = async (week: number, userId: number): Promise<GamePickSchema[]> => {
  const api = await useApi(GamePicksApi);
  return (await api.getGamePicksByUserAndWeek({ week, userId })).data;
};