import { Modal, Pressable, Text, View } from "react-native";
import { BlueGrey } from "../utils/colors";
import { styles } from "../utils/styles";
import Column from "./layouts/column";
import Row from "./layouts/row";

export interface ModalProps {
  children?: React.ReactNode | undefined;
  open: boolean;
  close: () => void;
}

export default function ModalWrapper(props: ModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.open}
      onRequestClose={props.close}
    >
      <Row>
        <Column style={{
          alignItems: null, 
          backgroundColor: BlueGrey.BlueGrey500, 
          padding: 10, 
          borderRadius: 10, 
          marginHorizontal: 10, 
          borderWidth: 2,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.75,
          shadowRadius: 4,
          elevation: 5,
        }}>
          <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', padding: 0, margin: 0 }}>
            <Pressable style={[styles.button, { paddingVertical: 5, paddingHorizontal: 10 }]} onPress={props.close}>
              <Text style={styles.text}>X</Text>
            </Pressable>
          </View>
          {props.children}
        </Column>
      </Row>
    </Modal>
  )
}