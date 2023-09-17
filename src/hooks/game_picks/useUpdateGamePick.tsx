import { GamePickSchema, GamePicksApi } from "../../apis";
import useApi from "../useApi";

export const useUpdateGamePick = async (data: GamePickSchema): Promise<void> => {
  const api = await useApi(GamePicksApi);
  await api.putGamePickById({ id: data.id, payload: data });
};