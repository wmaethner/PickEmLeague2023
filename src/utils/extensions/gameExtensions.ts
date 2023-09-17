import moment from "moment";
import { GameSchema } from "../../apis";


export const gameStarted = (game: GameSchema): boolean => {
  return moment() > moment.utc(game.gameTime);
}

export const gameOver = (game: GameSchema): boolean => {
  return !(game.result == 1);
}