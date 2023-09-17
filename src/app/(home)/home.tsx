import { useEffect, useState } from 'react';
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';
import { GameSchema, SummarySchema } from '../../apis';
import AppBackground from '../../components/appBackground';
import PlayerPicks from '../../components/game_picks/playerPicks';
import Loading from '../../components/loading';
import Scoreboard from '../../components/scoreboard';
import WeekSelector from '../../components/weekSelector';
import { useGetGames } from '../../hooks/games/useGetGames';
import { useGetMisc } from '../../hooks/useGetMisc';
import { useGetWeekSummaries } from '../../hooks/useGetWeekSummaries';
import { Blue } from '../../utils/colors';
import { styles } from '../../utils/styles';


export default function Home() {
  const [loading, setLoading] = useState(true);
  const [summaries, setSummaries] = useState<SummarySchema[]>([]);
  const [week, setWeek] = useState(1);
  const [games, setGames] = useState<GameSchema[]>([]);
  const [selectedTab, setTab] = useState(0);

  useEffect(() => {
    async function GetWeek() {
      setWeek((await useGetMisc()).currentWeek);
      setLoading(false);
    }

    GetWeek();
  }, [])

  useEffect(() => {
    async function GetData() {
      setSummaries(await useGetWeekSummaries(week));
      setGames(await useGetGames(week));
    }

    GetData();
  }, [week])


  const buttonStyle = (tab: number): StyleProp<ViewStyle> => {
    return [styles.button, {backgroundColor: selectedTab == tab ? Blue.Blue500 : 'gray'}];
  }

  const selectedTabView = () => {
    switch (selectedTab) {
      case 0:
        return <Scoreboard summaries={summaries} games={games} />
      case 1:
        return <PlayerPicks week={week} />
      default:
        break;
    }
  }

  const homeView = () => (
    <View style={styles.viewRow}>
      <View style={styles.viewColumn}>
        <WeekSelector week={week} setWeek={setWeek} />
        <View style={styles.viewRow}>
          <View style={styles.viewColumn}>
            <Pressable style={buttonStyle(0)} onPress={(() => setTab(0))}>
              <Text style={styles.text}>Scoreboard</Text>
            </Pressable>
          </View>
          <View style={styles.viewColumn}>
            <Pressable style={buttonStyle(1)} onPress={(() => setTab(1))}>
              <Text style={styles.text}>Player Picks</Text>
            </Pressable>
          </View>
        </View>
        {selectedTabView()}
      </View>
    </View>
  )

  return (
    <AppBackground>
      {
        loading ?
          <Loading /> : homeView()
      }
    </AppBackground>
  )
}