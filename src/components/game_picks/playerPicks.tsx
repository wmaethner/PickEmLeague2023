import { useEffect, useState } from "react";
import { LayoutChangeEvent, Pressable, Text, View } from "react-native";
import * as Progress from 'react-native-progress';
import { GamePickSchema, GameSchema, UserSchema } from "../../apis";
import { useGetGamePicksByWeek } from "../../hooks/game_picks/useGetGamePicksByWeek";
import { useGetGames } from "../../hooks/games/useGetGames";
import { Blue, BlueGrey } from "../../utils/colors";
import { gameStarted } from "../../utils/extensions/gameExtensions";
import { styles } from "../../utils/styles";
import PlayerPicksModal from "./playerPicksModal";

export interface PlayerPicksProps {
  week: number;
}

export default function PlayerPicks(props: PlayerPicksProps) {
  const [gamePicks, setGamePicks] = useState<GamePickSchema[]>([]);
  const [games, setGames] = useState<GameSchema[]>([])
  const [width, setWidth] = useState<number>(null);
  const [playerPicksModalOpen, setPlayerPicksModalOpen] = useState(false);
  const [picksModalGame, setPicksModalGame] = useState<GameSchema>(null);

  useEffect(() => {
    async function GetGames() {
      setGames(await useGetGames(props.week));
    }
    async function GetGamePicks() {
      setGamePicks(await useGetGamePicksByWeek(props.week));
    }

    GetGames();
    GetGamePicks();
  }, [props.week])

  const picksForTeam = (game: GameSchema, home: boolean): UserSchema[] => {
    const picksForGame = gamePicks.filter(gp => gp.game.id == game.id);
    return picksForGame.filter(gp => gp.pick == (home ? 2 : 3))
  }

  const handleLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  }

  const startedGames = () => {
    return games.filter(g => gameStarted(g));
  }

  const picksForGame = (game: GameSchema) => {
    return gamePicks.filter(gp => gp.game?.id == game?.id);
  }

  // TODO: Maybe make this dynamic
  const totalLength = 20;

  return (
    <View style={[styles.viewRow, { flex: 10, alignItems: 'flex-start', justifyContent: 'space-evenly' }]}>
      <View style={styles.viewColumn}>
        <View style={styles.viewRow}>
          <Text style={[styles.text, { fontSize: 14 }]}>Click row to see who picked who</Text>
        </View>
        {
          startedGames().map(game => (
            <View key={game.id} style={[styles.viewRow, { backgroundColor: BlueGrey.BlueGrey50, justifyContent: 'center', borderWidth: 1, margin: 0, padding: 0 }]}>
              <Pressable 
                onPress={() => {
                  setPicksModalGame(game);
                  setPlayerPicksModalOpen(true);
                }} 
                style={{ flexDirection: 'row' }}>
                <View style={[styles.viewColumn, { flex: 1 }]}>
                  <Text style={[styles.text, styles.darkText, { fontSize: 14 }]}> {game.awayTeam.name}</Text>
                </View>
                <View style={styles.viewColumn} onLayout={handleLayout}>
                  <Progress.Bar progress={(totalLength - picksForTeam(game, false).length) / totalLength} height={10} width={width} borderRadius={0} color="white" unfilledColor={Blue.Blue500} borderColor="black" />
                </View>
                <View style={styles.viewColumn} onLayout={handleLayout}>
                  <Progress.Bar progress={picksForTeam(game, true).length / totalLength} height={10} width={width} borderRadius={0} unfilledColor="white" color={Blue.Blue500} borderColor="black" />
                </View>
                <View style={[styles.viewColumn, { flex: 1 }]}>
                  <Text style={[styles.text, styles.darkText, { fontSize: 14 }]}>{game.homeTeam.name}</Text>
                </View>
              </Pressable>
            </View>
          ))

        }
        <PlayerPicksModal
          open={playerPicksModalOpen}
          close={() => setPlayerPicksModalOpen(false)}
          game={picksModalGame}
          picks={picksForGame(picksModalGame)} />
      </View>
    </View>
  )
}