import { useEffect, useState } from 'react';
import { GameSchema, SummarySchema } from '../../apis';
import AppBackground from '../../components/appBackground';
import Container from '../../components/layouts/container';
import Scoreboard from '../../components/scoreboard';
import { useGetAllGames } from '../../hooks/games/useGetAllGames';
import { useGetSeasonSummaries } from '../../hooks/useGetSeasonSummaries';


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
      <Container>
        <Scoreboard summaries={summaries} games={games} />
      </Container>
    </AppBackground>
  )
}