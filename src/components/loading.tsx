import { Text, View } from "react-native";
import { BlueGrey } from "../utils/colors";
import { styles } from "../utils/styles";


export default function Loading() {
  return (
    <View style={styles.viewRow}>
      <View style={styles.viewColumn}>
        <View style={{ backgroundColor: BlueGrey.BlueGrey500, padding: 10, borderRadius: 10, alignItems: 'center' }}>
          <Text style={styles.title}>LOADING...</Text>
        </View>
      </View>
    </View>
  )
}