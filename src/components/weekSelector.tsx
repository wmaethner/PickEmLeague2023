import { Pressable, Text } from "react-native";
import { styles } from "../utils/styles";
import Column from "./layouts/column";
import Row from "./layouts/row";


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
    <Row>
      <Column>
        <Pressable style={styles.button} onPress={e => handleWeekChange(-1)}>
          <Text style={styles.text}>&lt;</Text>
        </Pressable>
      </Column>
      <Column>
        <Text style={styles.title}>Week {props.week}</Text>
      </Column>
      <Column>
        <Pressable style={styles.button} onPress={e => handleWeekChange(1)}>
          <Text style={styles.text}>&gt;</Text>
        </Pressable>
      </Column>
    </Row>
  )
} 