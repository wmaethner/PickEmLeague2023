import { useEffect, useState } from 'react';
import { Pressable, PressableProps, Text } from 'react-native';
import { GameSchema } from '../../apis';
import AppBackground from '../../components/appBackground';
import Container from '../../components/layouts/container';
import Row from '../../components/layouts/row';
import WeekSelector from '../../components/weekSelector';
import { useGetGames } from '../../hooks/games/useGetGames';
import { useUpdateGame } from '../../hooks/games/useUpdateGame';
import { Blue } from '../../utils/colors';
import { styles } from '../../utils/styles';


export default function Games() {
  const [week, setWeek] = useState(1);
  const [games, setGames] = useState<GameSchema[]>([]);
  const [changed, setChanged] = useState(true);

  useEffect(() => {
    async function GetGames() {
      setGames(await useGetGames(week));
    }

    if (changed) {
      GetGames();
      setChanged(false);
    }
  }, [week, changed])

  const handleTeamPick = async (id: number, home: boolean) => {
    let updatedGame = games.find(game => game.id == id);
    updatedGame.result = home ? 2 : 3;
    await useUpdateGame(updatedGame);
    setChanged(true);
  }

  const handleWeekChange = (week: number) => {
    setWeek(week);
    setChanged(true);
  }

  const buttonProps = (game: GameSchema, home: boolean): PressableProps => {
    const pickedTeam = home ? game.result == 2 : game.result == 3;
    const backgroundColor = pickedTeam ? Blue.Blue700 : 'white'
    return {
      style: [
        styles.button,
        styles.noPadding,
        {
          flex: 2,
          backgroundColor: backgroundColor
        }
      ]
    }
  }

  return (
    <AppBackground>
      <Container>
        <WeekSelector week={week} setWeek={handleWeekChange} />
        {
          games.map(game => (
            <Row key={game.id}>
              <Pressable {...buttonProps(game, false)} onPress={e => handleTeamPick(game.id, false)}>
                <Text style={[styles.text, { color: game.result == 3 ? 'white' : 'black' }]}>{game.awayTeam.name}</Text>
              </Pressable>
              <Text style={[styles.text]}>@</Text>
              <Pressable {...buttonProps(game, true)} onPress={e => handleTeamPick(game.id, true)}>
                <Text style={[styles.text, { color: game.result == 2 ? 'white' : 'black' }]}>{game.homeTeam.name}</Text>
              </Pressable>
            </Row>
          ))
        }
      </Container>
    </AppBackground>
  )
}