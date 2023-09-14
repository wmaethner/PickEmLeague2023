import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { UserSchema } from '../../apis';
import AppBackground from '../../components/appBackground';
import PicksTable from '../../components/picksTable';
import WeekSelector from '../../components/weekSelector';
import { useUser } from '../../context/user';
import { useGetMisc } from '../../hooks/useGetMisc';
import { useGetUsers } from '../../hooks/useGetUsers';
import { BlueGrey } from '../../utils/colors';
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

  const loadingView = () => (
    <View style={styles.viewRow}>
      <View style={styles.viewColumn}>
        <View style={{ backgroundColor: BlueGrey.BlueGrey500, padding: 10, borderRadius: 10, alignItems: 'center' }}>
          <Text style={styles.title}>LOADING...</Text>
        </View>
      </View>
    </View>
  )

  const picksView = () => (
    <View style={styles.viewRow}>
      <View style={[styles.viewColumn]}>
        <WeekSelector week={week} setWeek={handleWeekChange} />
        <PicksTable week={week} userId={userId()} ignoreLocked={ignoreLocked} />
        {
          UserData.admin &&
          <View style={styles.viewRow}>
            <View style={styles.viewColumn}>
              <Pressable style={styles.button} onPress={e => setShowAdmin(!showAdmin)}>
                <Text style={[styles.text, { color: 'white' }]}>Admin {showAdmin ? 'true' : 'false'}</Text>
              </Pressable>
              {
                showAdmin &&
                <>
                  <View style={styles.viewRow}>
                    <View style={styles.viewColumn}>
                      <DropDownPicker
                        open={open}
                        value={impersonatedUser}
                        items={items()}
                        setOpen={setOpen}
                        setValue={setImpersonatedUser}
                      />
                    </View>
                    <View style={styles.viewColumn}>
                      <Pressable style={styles.button} onPress={e => setImpersonatedUser(null)}>
                        <Text style={[styles.text, { color: 'white' }]}>Clear</Text>
                      </Pressable>
                    </View>
                    <View style={styles.viewColumn}>
                      <Pressable style={styles.button} onPress={e => setIgnoreLocked(!ignoreLocked)}>
                        <Text style={[styles.text, { color: 'white' }]}>{ignoreLocked ? "Lock" : "Unlock"}</Text>
                      </Pressable>
                    </View>
                  </View>
                </>
              }
            </View>
          </View>
        }
      </View>
    </View>
  )


  return (
    <AppBackground>
      {
        loading ?
          loadingView() : picksView()
      }
    </AppBackground>
  )
}