

import { ImageBackground } from "react-native";
import { styles } from "../utils/styles";


export default function AppBackground(props: any) {
  return (
    <ImageBackground source={require('../../assets/background.jpeg')} resizeMode='cover' style={styles.image}>
      {props.children}
    </ImageBackground>
  )
} 