import { useEffect, useState } from 'react';
import { Pressable, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { UserSchema } from '../../apis';
import AppBackground from '../../components/appBackground';
import PicksTable from '../../components/game_picks/picksTable';
import Column from '../../components/layouts/column';
import Container from '../../components/layouts/container';
import Row from '../../components/layouts/row';
import Loading from '../../components/loading';
import WeekSelector from '../../components/weekSelector';
import { useUser } from '../../context/user';
import { useGetMisc } from '../../hooks/useGetMisc';
import { useGetUsers } from '../../hooks/useGetUsers';
import { styles } from '../../utils/styles';

export default function Picks() {
  const [loading, setLoading] = useState(true);
  const [week, setWeek] = useState(1);
  const { UserData } = useUser();
  const [ignoreLocked, setIgnoreLocked] = useState(false);
  const [users, setUsers] = useState<UserSchema[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [impersonatedUser, setImpersonatedUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function GetWeek() {
      setWeek((await useGetMisc()).currentWeek);
      setLoading(false);
    }
    async function GetUsers() {
      setUsers(await useGetUsers());
    }

    GetUsers();
    GetWeek();
  }, [])

  const userId = () => {
    return impersonatedUser ? impersonatedUser : UserData.id
  }

  const handleWeekChange = (week: number) => {
    setWeek(week);
  }

  const items = () => {
    return users.map(user => (
      {
        label: `${user.firstName} ${user.lastName}`,
        value: user.id.toString()
      }
    ))
  }

  const picksView = () => (
    <Container>
      <WeekSelector week={week} setWeek={handleWeekChange} />
      <PicksTable week={week} userId={userId()} ignoreLocked={ignoreLocked} />
      {
        UserData.admin &&
        <Container>
          <Pressable style={styles.button} onPress={e => setShowAdmin(!showAdmin)}>
            <Text style={[styles.text, { color: 'white' }]}>Admin {showAdmin ? 'true' : 'false'}</Text>
          </Pressable>
          {
            showAdmin &&
            <>
              <Row>
                <Column>
                  <DropDownPicker
                    open={open}
                    value={impersonatedUser}
                    items={items()}
                    setOpen={setOpen}
                    setValue={setImpersonatedUser}
                  />
                </Column>
                <Column>
                  <Pressable style={styles.button} onPress={e => setImpersonatedUser(null)}>
                    <Text style={[styles.text, { color: 'white' }]}>Clear</Text>
                  </Pressable>
                </Column>
                <Column>
                  <Pressable style={styles.button} onPress={e => setIgnoreLocked(!ignoreLocked)}>
                    <Text style={[styles.text, { color: 'white' }]}>{ignoreLocked ? "Lock" : "Unlock"}</Text>
                  </Pressable>
                </Column>
              </Row>
            </>
          }
        </Container>
      }
    </Container>
  )


  return (
    <AppBackground>
      {
        loading ?
          <Loading /> : picksView()
      }
    </AppBackground>
  )
}