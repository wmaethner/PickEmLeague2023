import { Modal, Pressable, Text, View } from "react-native";
import { UserSchema } from "../apis";
import { BlueGrey } from "../utils/colors";
import { styles } from "../utils/styles";

export interface UserInfoModalProps {
  open: boolean;
  close: () => void;
  user: UserSchema;
}

export default function UserInfoModal(props: UserInfoModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.open}
      onRequestClose={props.close}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: BlueGrey.BlueGrey500, padding: 10, borderRadius: 10 }}>
          <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', padding: 0, margin: 0 }}>
            <Pressable style={[styles.button, { paddingVertical: 5, paddingHorizontal: 10 }]} onPress={props.close}>
              <Text style={styles.text}>X</Text>
            </Pressable>
          </View>
          {
            props.user &&
            <>
              <Text style={styles.title}>{props.user.username}</Text>
              <Text style={styles.text}>{props.user.firstName} {props.user.lastName}</Text>
            </>
          }
        </View>
      </View>
    </Modal>
  )
}