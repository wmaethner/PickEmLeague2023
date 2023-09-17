import { Badge } from '@rneui/themed';
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import { useUser } from "../context/user";
import { useGetMisc } from '../hooks/useGetMisc';
import { BlueGrey } from "../utils/colors";
import { styles } from "../utils/styles";
import { versionUpdateAvailable } from '../utils/version_update_available';
import UserInfoModal from './userInfoModal';
import VersionModal from "./versionModal";

const { Popover } = renderers

export default function Header() {
  const { UserData } = useUser();
  const [versionModalOpen, setVersionModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    async function GetVersions() {
      const versions = (await useGetMisc()).versions;
      setUpdateAvailable(versionUpdateAvailable(versions));
    }

    GetVersions();
  }, [])

  const showBadge = () => {
    return updateAvailable;
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 0, margin: 0, height: 50, backgroundColor: BlueGrey.BlueGrey500 }}>
      <Menu renderer={Popover} rendererProps={{ placement: 'bottom' }}>
        <MenuTrigger style={styles.buttonCircle}>
          <Text style={[styles.text, { color: BlueGrey.BlueGrey500 }]}>{UserData.firstName[0]}{UserData.lastName[0]}</Text>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption style={{ padding: 10 }} onSelect={() => setVersionModalOpen(true)}>
            <Text>Version Info</Text>
            {
              updateAvailable &&
              <Badge
                value="!"
                status="error"
                containerStyle={{ position: 'absolute', bottom: -4, left: -4 }}
              />
            }
          </MenuOption>
          <MenuOption style={{ padding: 10 }} onSelect={() => setUserModalOpen(true)}>
            <Text>User Info</Text>
          </MenuOption>
        </MenuOptions>
        {
          showBadge() &&
          <Badge
            value="!"
            status="error"
            containerStyle={{ position: 'absolute', bottom: -4, left: -4 }}
          />
        }
      </Menu>
      <VersionModal open={versionModalOpen} close={() => setVersionModalOpen(false)} />
      <UserInfoModal open={userModalOpen} close={() => setUserModalOpen(false)} user={UserData} />
    </View>
  )
}