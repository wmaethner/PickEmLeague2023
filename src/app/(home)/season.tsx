import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { GameSchema, SummarySchema } from '../../apis';
import AppBackground from '../../components/appBackground';
import Scoreboard from '../../components/scoreboard';
import { useGetAllGames } from '../../hooks/games/useGetAllGames';
import { useGetSeasonSummaries } from '../../hooks/useGetSeasonSummaries';
import { styles } from '../../utils/styles';


export default function Home() {
  const [summaries, setSummaries] = useState<SummarySchema[]>([]);
  const [games, setGames] = useState<GameSchema[]>([]);

  useEffect(() => {
    async function GetSummaries() {
      setSummaries(await useGetSeasonSummaries());
    }
    async function GetGames() {
      setGames(await useGetAllGames());
    }

    GetGames();
    GetSummaries();
  }, [])

  return (
    <AppBackground>
      <View style={styles.viewRow}>
        <View style={styles.viewColumn}>
          <Scoreboard summaries={summaries} games={games} />
        </View>
      </View>
    </AppBackground>
  )
}