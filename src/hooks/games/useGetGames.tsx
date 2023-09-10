import { GameSchema, GamesApi } from "../../apis";
import useApi from "../useApi";

export const useGetGames = async (week: number): Promise<GameSchema[]> => {
  const api = await useApi(GamesApi);
  return (await api.getGamesByWeek({ week })).data;
};