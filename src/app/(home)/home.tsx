import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { Row, Table } from 'react-native-reanimated-table';
import { GameSchema, SummarySchema } from '../../apis';
import AppBackground from '../../components/appBackground';
import WeekSelector from '../../components/weekSelector';
import { useGetGames } from '../../hooks/games/useGetGames';
import { useGetMisc } from '../../hooks/useGetMisc';
import { useGetWeekSummaries } from '../../hooks/useGetWeekSummaries';
import { BlueGrey } from '../../utils/colors';
import { styles } from '../../utils/styles';


export default function Home() {
  const [loading, setLoading] = useState(true);
  const [summaries, setSummaries] = useState<SummarySchema[]>([]);
  const [week, setWeek] = useState(1);
  const [games, setGames] = useState<GameSchema[]>([]);

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

  const header = () => [
    '', 'Username', 'Score', 'Picks Correct'
  ]

  const widths = () => {
    const windowWidth = Dimensions.get('window').width;
    return [windowWidth * 0.1, windowWidth * 0.5, windowWidth * 0.2, windowWidth * 0.2]
  }

  const gamesPlayed = () => {
    return games.filter(g => g.result !== 1).length;
  }

  const mapSummary = (summary: SummarySchema, index: number) =>
    [
      index + 1,
      summary.user.username,
      summary.score,
      `${summary.correctPicks}/${gamesPlayed()}`
    ]

  const loadingView = () => (
    <View style={styles.viewRow}>
      <View style={styles.viewColumn}>
        <View style={{ backgroundColor: BlueGrey.BlueGrey500, padding: 10, borderRadius: 10, alignItems: 'center' }}>
          <Text style={styles.title}>LOADING...</Text>
        </View>
      </View>
    </View>
  )

  const homeView = () => (
    <View style={styles.viewRow}>
      <View style={styles.viewColumn}>
        <WeekSelector week={week} setWeek={setWeek} />
        <View style={[styles.viewRow, { flex: 4, alignItems: 'flex-start' }]}>
          <View style={{ backgroundColor: BlueGrey.BlueGrey50 }}>
            <Table borderStyle={{ borderWidth: 1, borderColor: 'black' }}>
              <Row data={header()} widthArr={widths()} style={{ height: 40, backgroundColor: BlueGrey.BlueGrey600 }} textStyle={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }} />
            </Table>
            <ScrollView style={{ marginTop: -1, marginBottom: 0 }}>
              <Table borderStyle={{ borderWidth: 1, borderColor: 'black' }}>
                {summaries.map((summary, index) => (
                  <Row
                    key={index}
                    data={mapSummary(summary, index)}
                    widthArr={widths()}
                    style={{ height: 30 }}
                    textStyle={{ color: 'black', textAlign: 'center' }}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  )

  return (
    <AppBackground>
      {
        loading ?
          loadingView() : homeView()
      }
    </AppBackground>
  )
}