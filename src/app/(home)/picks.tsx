import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { GamePickSchema, UserSchema } from '../../apis';
import AppBackground from '../../components/appBackground';
import PicksTable from '../../components/picksTable';
import WeekSelector from '../../components/weekSelector';
import { useUser } from '../../context/user';
import { useGetGamePicks } from '../../hooks/useGetGamePicks';
import { useGetUsers } from '../../hooks/useGetUsers';
import { styles } from '../../utils/styles';

export default function Picks() {
  const [week, setWeek] = useState(1);
  const [picks, setPicks] = useState<GamePickSchema[]>([]);
  const [changed, setChanged] = useState(true);
  const { UserData } = useUser();
  const [time, setTime] = useState(Date.now());
  const [ignoreLocked, setIgnoreLocked] = useState(false);
  const [users, setUsers] = useState<UserSchema[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [impersonatedUser, setImpersonatedUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function GetUsers() {
      setUsers(await useGetUsers());
    }

    GetUsers();
  })

  useEffect(() => {
    // update every minute
    const interval = setInterval(() => setTime(Date.now()), 60000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  useEffect(() => {
    async function GetPicks() {
      console.log(userId());
      setPicks(await useGetGamePicks(week, userId()));
    }

    if (changed) {
      console.log("Change");
      GetPicks();
      setChanged(false);
    }
  }, [week, changed])

  useEffect(() => {
    async function GetPicks() {
      console.log(userId());
      setPicks(await useGetGamePicks(week, userId()));
    }

    GetPicks();
  }, [impersonatedUser])

  const userId = () => {
    return impersonatedUser ? impersonatedUser : UserData.id
  }

  const handleWeekChange = (week: number) => {
    setWeek(week);
    setChanged(true);
  }

  const items = () => {
    return users.map(user => (
      {
        label: `${user.firstName} ${user.lastName}`,
        value: user.id.toString()
      }
    ))
  }


  return (
    <AppBackground>
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
    </AppBackground>
  )
}