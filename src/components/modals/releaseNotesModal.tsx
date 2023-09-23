import { AntDesign, Octicons } from '@expo/vector-icons';
import moment from 'moment';
import { useEffect, useState } from "react";
import { Text } from "react-native";
import Accordion from 'react-native-collapsible/Accordion';
import { ReleaseNotesSchema } from "../../apis";
import { useGetReadReleaseNotes } from '../../hooks/release_notes/useGetReadReleaseNotes';
import { useGetReleaseNotes } from "../../hooks/release_notes/useGetReleaseNotes";
import { useReadReleaseNote } from '../../hooks/release_notes/useReadReleaseNote';
import { BlueGrey } from '../../utils/colors';
import { emptyArray } from '../../utils/extensions/arrayExtensions';
import { styles } from "../../utils/styles";
import { unreadReleaseNotes } from '../../utils/unread_release_notes';
import Column from '../layouts/column';
import Row from '../layouts/row';
import ModalWrapper from "./modalWrapper";

export interface ReleaseNotesModalProps {
  open: boolean;
  close: () => void;
  releaseNoteRead: () => void;
}

export default function ReleaseNotesModal(props: ReleaseNotesModalProps) {
  const [releaseNotes, setReleaseNotes] = useState<ReleaseNotesSchema[]>([]);
  const [activeSections, setActiveSections] = useState([]);
  const [readReleaseNotes, setReadReleaseNotes] = useState<number[]>([]);

  useEffect(() => {
    async function GetReleaseNotes() {
      setReleaseNotes(await useGetReleaseNotes());
      setReadReleaseNotes((await useGetReadReleaseNotes()).ids);
    }

    GetReleaseNotes();
  }, [props.open])

  const releaseNoteTitle = (releaseNote: ReleaseNotesSchema, _, isActive: boolean) => (
    <Row style={{ flex: null }}>
      <Column>
        {
          unreadReleaseNotes(releaseNotes, readReleaseNotes).includes(releaseNote.id) &&
          <AntDesign name="exclamationcircle" size={24} color="red" />
        }
      </Column>
      <Column style={{ flex: 7 }}>
        <Text style={[styles.title, { fontSize: 24 }]}>{moment.utc(releaseNote.date).format('M-D')}: {releaseNote.title}</Text>
      </Column>
      <Column style={{ flex: 1 }}>
        <AntDesign name={isActive ? "caretup" : "caretdown"} size={24} color={'white'} />
      </Column>
    </Row>
  )

  const releaseNoteContent = (releaseNote: ReleaseNotesSchema) => (
    <>
      {
        releaseNote.entries.map(entry => (
          <Row key={entry.id} style={{ flex: null, backgroundColor: BlueGrey.BlueGrey700, borderBottomColor: 'white', borderBottomWidth: 1 }}>
            <Column>
              <Octicons name="dot-fill" size={24} color="white" />
            </Column>
            <Column style={{ flex: 5, alignItems: 'baseline' }}>
              <Text style={[styles.text, { textAlign: 'left' }]}>{entry.entry}</Text>
            </Column>
          </Row>

        ))
      }
    </>
  )

  const handleOnChange = async (sections: number[]) => {
    if (!emptyArray(sections)) {
      const id = releaseNotes[sections[0]].id;
      setReadReleaseNotes([...readReleaseNotes, id]);
      await useReadReleaseNote(id);
      props.releaseNoteRead();
    }
    setActiveSections(sections);
  }

  return (
    <ModalWrapper
      open={props.open}
      close={props.close}
      title="Release Notes"
    >
      <Accordion
        activeSections={activeSections}
        sections={releaseNotes}
        renderHeader={releaseNoteTitle}
        renderContent={releaseNoteContent}
        onChange={handleOnChange}
      />
    </ModalWrapper>
  )
}