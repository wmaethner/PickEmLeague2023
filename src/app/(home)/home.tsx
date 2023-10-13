import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleProp, Text, ViewStyle } from 'react-native';
import { GameSchema, SummarySchema } from '../../apis';
import AppBackground from '../../components/appBackground';
import PlayerPicks from '../../components/game_picks/playerPicks';
import Column from '../../components/layouts/column';
import Container from '../../components/layouts/container';
import Row from '../../components/layouts/row';
import Loading from '../../components/loading';
import Scoreboard from '../../components/scoreboard';
import WeekSelector from '../../components/weekSelector';
import { useGetGames } from '../../hooks/games/useGetGames';
import { useGetMisc } from '../../hooks/useGetMisc';
import { useGetWeekSummaries } from '../../hooks/useGetWeekSummaries';
import { useSetPushToken } from '../../hooks/useSetPushToken';
import { Blue } from '../../utils/colors';
import { registerForPushNotificationsAsync } from '../../utils/push_notifications';
import { styles } from '../../utils/styles';


export default function Home() {
  const [loading, setLoading] = useState(true);
  const [summaries, setSummaries] = useState<SummarySchema[]>([]);
  const [week, setWeek] = useState(1);
  const [games, setGames] = useState<GameSchema[]>([]);
  const [selectedTab, setTab] = useState(0);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification>(null);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    async function GetWeek() {
      setWeek((await useGetMisc()).currentWeek);
      setLoading(false);
    }

    GetWeek();

    registerForPushNotificationsAsync().then(async token => {
      await useSetPushToken(token);
      setExpoPushToken(token)
    });

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification)
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [])

  useEffect(() => {
    async function GetData() {
      setSummaries(await useGetWeekSummaries(week));
      setGames(await useGetGames(week));
    }

    GetData();
  }, [week])


  const buttonStyle = (tab: number): StyleProp<ViewStyle> => {
    return [styles.button, { backgroundColor: selectedTab == tab ? Blue.Blue500 : 'gray' }];
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
    <Container>
      <WeekSelector week={week} setWeek={setWeek} />
      <Row>
        <Column>
          <Pressable style={buttonStyle(0)} onPress={(() => setTab(0))}>
            <Text style={styles.text}>Scoreboard</Text>
          </Pressable>
        </Column>
        <Column>
          <Pressable style={buttonStyle(1)} onPress={(() => setTab(1))}>
            <Text style={styles.text}>Player Picks</Text>
          </Pressable>
        </Column>
      </Row>
      {selectedTabView()}
    </Container>
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