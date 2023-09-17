import { View, ViewProps } from "react-native";
import { styles } from "../../utils/styles";

export default function Row(props: ViewProps) {
  return (
    <View style={[styles.viewRow, props.style]}>
      {props.children}
    </View>
  )
}

