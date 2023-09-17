import { Text, View } from "react-native";
import { BlueGrey } from "../utils/colors";
import { styles } from "../utils/styles";
import Container from "./layouts/container";


export default function Loading() {
  return (
    <Container>
      <View style={{ backgroundColor: BlueGrey.BlueGrey500, padding: 10, borderRadius: 10, alignItems: 'center' }}>
        <Text style={styles.title}>LOADING...</Text>
      </View>
    </Container>
  )
}