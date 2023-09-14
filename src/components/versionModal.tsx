import { useEffect, useState } from "react";
import { Modal, Platform, Pressable, Text, View } from "react-native";
import { VersionSchema } from "../apis";
import { useGetMisc } from "../hooks/useGetMisc";
import { BlueGrey } from "../utils/colors";
import { styles } from "../utils/styles";
import { versionUpdateAvailable } from "../utils/version_update_available";

export interface VersionModalProps {
  open: boolean;
  close: () => void;
}

export default function VersionModal(props: VersionModalProps) {
  const [versions, setVersions] = useState<VersionSchema>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    async function GetVersions() {
      const versions = (await useGetMisc()).versions;
      setVersions(versions);
      setUpdateAvailable(versionUpdateAvailable(versions));
    }

    GetVersions();
  }, [])

  const updateDescription = () => {
    if (Platform.OS == 'ios') {
      return "Go to TestFlight to update."
    } else {
      return "Go to original installation link to update."
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.open}
      onRequestClose={props.close}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: BlueGrey.BlueGrey500, padding: 20, borderRadius: 10 }}>
          {
            updateAvailable &&
            <View>
              <Text style={[styles.text, { fontSize: 20 }]}>**Client Update Available**</Text>
              <Text style={[styles.text, { fontSize: 15 }]}>{updateDescription()}</Text>
              <Text />
            </View>
          }
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.text}>Client Version: {Platform.OS == 'ios' ? versions?.ios : versions?.android}</Text>
            <Text style={styles.text}>Server Version: {versions?.server}</Text>
          </View>
          <Pressable style={styles.button} onPress={props.close}>
            <Text style={styles.text}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}