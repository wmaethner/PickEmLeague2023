import { Badge } from '@rneui/themed';
import { useEffect, useState } from "react";
import { Text } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import { useUser } from "../context/user";
import { useGetReadReleaseNotes } from '../hooks/release_notes/useGetReadReleaseNotes';
import { useGetReleaseNotes } from '../hooks/release_notes/useGetReleaseNotes';
import { useGetMisc } from '../hooks/useGetMisc';
import { BlueGrey } from "../utils/colors";
import { styles } from "../utils/styles";
import { hasUnreadReleaseNotes } from '../utils/unread_release_notes';
import { versionUpdateAvailable } from '../utils/version_update_available';
import Row from './layouts/row';
import ReleaseNotesModal from './modals/releaseNotesModal';
import UserInfoModal from './modals/userInfoModal';
import VersionModal from "./modals/versionModal";

const { Popover } = renderers

export default function Header() {
  const { UserData } = useUser();
  const [versionModalOpen, setVersionModalOpen] = useState(false);
  const [releaseNotesModalOpen, setReleaseNotesModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [hasUnreadNotes, setHasUnreadNotes] = useState(false);
  const [releaseNotesReadChanged, setReleaseNotesReadChanged] = useState(true);

  useEffect(() => {
    async function GetVersions() {
      const versions = (await useGetMisc()).versions;
      setUpdateAvailable(versionUpdateAvailable(versions));
    }

    GetVersions();
  }, [])

  useEffect(() => {
    async function GetReleaseNotes() {
      const releaseNotes = await useGetReleaseNotes();
      const readNotes = await useGetReadReleaseNotes();
      setHasUnreadNotes(hasUnreadReleaseNotes(releaseNotes, readNotes.ids));
    }

    if (releaseNotesReadChanged) {
      GetReleaseNotes();
      setReleaseNotesReadChanged(false);
    }
  }, [releaseNotesReadChanged])

  const showBadge = () => {
    return updateAvailable || hasUnreadNotes;
  }

  const handleReadReleaseNote = () => {
    setReleaseNotesReadChanged(true);
  }

  // TODO: Wrap in release note context
  return (
    <Row style={{ flex: null, justifyContent: 'flex-end', padding: 0, margin: 0, height: 50, backgroundColor: BlueGrey.BlueGrey500 }}>
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
          <MenuOption style={{ padding: 10 }} onSelect={() => setReleaseNotesModalOpen(true)}>
            <Text>Release Notes</Text>
            {
              hasUnreadNotes &&
              <Badge
                value="!"
                status="error"
                containerStyle={{ position: 'absolute', bottom: -4, left: -4 }}
              />
            }
          </MenuOption>
          {/* <MenuOption style={{ padding: 10 }} onSelect={() => setUserModalOpen(true)}>
            <Text>User Info</Text>
          </MenuOption> */}
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
      <ReleaseNotesModal open={releaseNotesModalOpen} close={() => setReleaseNotesModalOpen(false)} releaseNoteRead={handleReadReleaseNote} />
      <UserInfoModal open={userModalOpen} close={() => setUserModalOpen(false)} user={UserData} />
    </Row>
  )
}