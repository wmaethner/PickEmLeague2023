import { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, View } from 'react-native';
import { Row, Table } from 'react-native-reanimated-table';
import { UserData } from '../../apis/models/UserData';
import { useGetUsers } from '../../hooks/useGetUsers';
import { styles } from '../../utils/styles';

export default function Home() {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    async function GetUsers() {
      setUsers(await useGetUsers());
    }

    GetUsers();
  }, [])

  const header = () => [
    'Username', 'Score', 'Picks Correct'
  ]

  const widths = () => {
    const windowWidth = Dimensions.get('window').width;
    return [windowWidth * .6, windowWidth * .2, windowWidth * .2]
  }

  const mapUser = (user: UserData) => [user.username, 5, 1]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row data={header()} widthArr={widths()} />
          </Table>
          <ScrollView style={{ marginTop: -1 }}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              {users.map((user, index) => (
                <Row 
                  key={index}
                  data={mapUser(user)}
                  widthArr={widths()}
                  
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}