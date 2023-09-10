import { GameSchema, GamesApi } from "../../apis";
import useApi from "../useApi";

export const useUpdateGame = async (game: GameSchema): Promise<void> => {
  const api = await useApi(GamesApi);
  return (await api.putGameById({ id: game.id, payload: game }));
};