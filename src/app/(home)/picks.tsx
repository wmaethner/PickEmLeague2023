import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { Pressable, PressableProps, Text, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { DragEndParams, RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { GamePickSchema, GameSchema } from '../../apis';
import AppBackground from '../../components/appBackground';
import WeekSelector from '../../components/weekSelector';
import { useUser } from '../../context/user';
import { useGetGamePicks } from '../../hooks/useGetGamePicks';
import { useUpdateGamePick } from '../../hooks/useUpdateGamePick';
import { useUpdateGamePickOrder } from '../../hooks/useUpdateGamePickOrder';
import { Blue, BlueGrey } from '../../utils/colors';
import { styles } from '../../utils/styles';


export default function Picks() {
  const [week, setWeek] = useState(1);
  const [picks, setPicks] = useState<GamePickSchema[]>([]);
  const [changed, setChanged] = useState(true);
  const { UserData } = useUser();
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    // update every minute
    const interval = setInterval(() => setTime(Date.now()), 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log("Picks use effect");
    async function GetPicks() {
      console.log(`Get picks for ${week} and user ${UserData.id}`);
      setPicks(await useGetGamePicks(week, UserData.id));
    }

    if (changed) {
      GetPicks();
      setChanged(false);
    }
  }, [week, changed])

  const handleTeamPick = async (id: number, home: boolean) => {
    console.log("Handle team pick")
    let updatedPick = picks.find(pick => pick.id == id);
    updatedPick.pick = home ? 2 : 3;
    await useUpdateGamePick(updatedPick);
    setChanged(true);
  }

  const swap = (array: GamePickSchema[], i: number, j: number) => {
    const temp = array[j];
    array[j] = array[i];
    array[i] = temp;
    array[i].amount = array.length - i;
    array[j].amount = array.length - j;
  }

  const inRange = (index: number, from: number, to: number) => {
    return (index >= Math.min(from, to)) && (index <= Math.max(from, to));
  }

  const reorder = async (params: DragEndParams<GamePickSchema>) => {
    let lockedIndexes = [];
    params.data.forEach((pick, index) => {
      if (gameStarted(pick.game) && inRange(index, params.from, params.to)) {
        lockedIndexes.push(index);
      }
      pick.amount = picks.length - index;
    })

    const movedDown = params.from < params.to;

    // loop over locked rows and swap based on direction of move
    // if moved down then swap with previous index (opposites opposite)
    lockedIndexes.forEach(index => {
      console.log(index);
      swap(params.data, index, index + (movedDown ? 1 : -1));
    });

    setPicks(params.data);

    useUpdateGamePickOrder(UserData.id, week, params.data).then(() => {
      setChanged(true);
    });
  }

  const handleWeekChange = (week: number) => {
    setWeek(week);
    setChanged(true);
  }

  const gameStarted = (game: GameSchema): boolean => {
    return moment() > moment.utc(game.gameTime);
  }

  const buttonProps = (pick: GamePickSchema, home: boolean): PressableProps => {
    const disabled = gameStarted(pick.game);
    const pickedTeam = home ? pick.pick == 2 : pick.pick == 3;
    const backgroundColor = disabled ? (
      pickedTeam ? Blue.Blue900 : BlueGrey.BlueGrey300
    ) : (
      pickedTeam ? Blue.Blue700 : 'white'
    );
    return {
      disabled: disabled,
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

  const textColor = (game: GameSchema) => {
    return gameStarted(game) ? 'white' : 'black';
  }

  const renderItem = ({ item, drag, isActive }: RenderItemParams<GamePickSchema>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={drag}
          disabled={isActive || gameStarted(item.game)}

          style={[
            {
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'stretch',
              height: 40,
              margin: 1,
              backgroundColor: isActive ? Blue.Blue500 :
                gameStarted(item.game) ? BlueGrey.BlueGrey800 : BlueGrey.BlueGrey100
            },
          ]}
        >
          <View style={styles.viewRow}>
            {/* <Text style={[styles.text, styles.darkText, { flex: 1 }]}>{item.amount}</Text> */}
            <Text style={[styles.text, { flex: 1, color: textColor(item.game) }]}>{item.amount}</Text>
            <Pressable {...buttonProps(item, false)} onPress={e => handleTeamPick(item.id, false)}>
              <Text style={[styles.text, { color: item.pick == 3 ? 'white' : 'black' }]}>{item.game.awayTeam.name}</Text>
            </Pressable>
            <Text style={[styles.text, { color: textColor(item.game) }]}>@</Text>
            <Pressable {...buttonProps(item, true)} onPress={e => handleTeamPick(item.id, true)}>
              <Text style={[styles.text, { color: item.pick == 2 ? 'white' : 'black' }]}>{item.game.homeTeam.name}</Text>
            </Pressable>
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <AppBackground>
      <View style={styles.viewRow}>
        <View style={[styles.viewColumn]}>
          <WeekSelector week={week} setWeek={handleWeekChange} />
          <View style={[styles.viewRow, { flex: 4 }]}>
            <DraggableFlatList
              data={picks}
              // onDragEnd={handleChange}
              onDragEnd={reorder}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              style={{ flex: 1 }}
              containerStyle={{ flex: 1, flexDirection: 'column', borderWidth: 2, padding: 0 }}
            />
          </View>
        </View>
      </View>
    </AppBackground>
  )
}