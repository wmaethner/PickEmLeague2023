import { View, ViewProps } from "react-native";
import { styles } from "../../utils/styles";

export default function Column(props: ViewProps) {
  return (
    <View style={[styles.viewColumn, props.style]} onLayout={props.onLayout}>
    {/* <View style={[styles.viewColumn, props.style]}> */}
      {props.children}
    </View>
  )
}

