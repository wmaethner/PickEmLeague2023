import { useEffect, useState } from "react";
import { Platform, Text } from "react-native";
import { VersionSchema } from "../apis";
import { useGetMisc } from "../hooks/useGetMisc";
import { styles } from "../utils/styles";
import { versionUpdateAvailable } from "../utils/version_update_available";
import Row from "./layouts/row";
import ModalWrapper from "./modalWrapper";

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
    <ModalWrapper
      open={props.open}
      close={props.close}
    >
      {
        updateAvailable &&
        <Row>
          <Text style={[styles.text, { fontSize: 20 }]}>**Client Update Available**</Text>
          <Text style={[styles.text, { fontSize: 15 }]}>{updateDescription()}</Text>
          <Text />
        </Row>
      }
      <>
        <Text style={styles.text}>Client Version: {Platform.OS == 'ios' ? versions?.ios : versions?.android}</Text>
        <Text style={styles.text}>Server Version: {versions?.server}</Text>
      </>
    </ModalWrapper>
  )
}