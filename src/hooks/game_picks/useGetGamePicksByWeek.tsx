import { GamePickSchema, GamePicksApi } from "../../apis";
import useApi from "../useApi";

export const useGetGamePicksByWeek = async (week: number): Promise<GamePickSchema[]> => {
  const api = await useApi(GamePicksApi);
  return (await api.getGamePicksByWeek({ week })).data;
};