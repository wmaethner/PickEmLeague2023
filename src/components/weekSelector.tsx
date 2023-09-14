import { Pressable, Text, View } from "react-native";
import { styles } from "../utils/styles";


export interface WeekSelectorProps {
  week: number;
  setWeek: (week: number) => void;
}

export default function WeekSelector(props: WeekSelectorProps) {

  const handleWeekChange = (change: number) => {
    let newWeek = props.week + change;
    if (newWeek === 0) {
      newWeek = 18;
    }
    if (newWeek === 19) {
      newWeek = 1;
    }
    props.setWeek(newWeek);
  }

  return (
    <View style={[styles.viewRow]}>
      <View style={styles.viewColumn}>
        <Pressable style={styles.button} onPress={e => handleWeekChange(-1)}>
          <Text style={styles.text}>&lt;</Text>
        </Pressable>
      </View>
      <View style={styles.viewColumn}>
        <Text style={styles.title}>Week {props.week}</Text>
      </View>
      <View style={styles.viewColumn}>
        <Pressable style={styles.button} onPress={e => handleWeekChange(1)}>
          <Text style={styles.text}>&gt;</Text>
        </Pressable>
      </View>
    </View>
  )
} 