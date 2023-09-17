import { GameSchema, GamesApi } from "../../apis";
import useApi from "../useApi";

export const useGetAllGames = async (): Promise<GameSchema[]> => {
  const api = await useApi(GamesApi);
  return (await api.getGameList()).data;
};