import { GamePickSchema, GamePicksApi } from "../apis";
import useApi from "./useApi";

export const useUpdateGamePickOrder = async (userId: number, week: number, data: GamePickSchema[]): Promise<void> => {
  const api = await useApi(GamePicksApi);
  await api.putGamePicksByUserAndWeek({ userId, week, payload: data });
};