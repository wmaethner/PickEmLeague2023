import { Text } from "react-native";
import { GamePickSchema, GameSchema } from "../../apis";
import { styles } from "../../utils/styles";
import Column from "../layouts/column";
import Row from "../layouts/row";
import ModalWrapper from "../modals/modalWrapper";
import UserInfoLink from "../userInfoLink";

export interface PlayerPicksModalProps {
  open: boolean;
  close: () => void;
  game: GameSchema;
  picks: GamePickSchema[];
}

export default function PlayerPicksModal(props: PlayerPicksModalProps) {
  const filteredPicks = (pick: number) => {
    return props.picks.filter(p => p.pick == pick);
  }

  return (
    <ModalWrapper
      open={props.open}
      close={props.close}
    >
      {
        props.game &&
        <>
          <Row style={{ flex: null }}>
            <Column>
              <Text style={styles.title}>{props.game.awayTeam.name}</Text>
            </Column>
            <Column>
              <Text style={styles.title}>{props.game.homeTeam.name}</Text>
            </Column>
          </Row>
          <Row style={{ flex: null }}>
          <Column>
              {
                filteredPicks(3).map(p => (
                  <UserInfoLink key={p.id} user={p.user} />
                ))
              }
            </Column>
            <Column>
              {
                filteredPicks(2).map(p => (
                  <UserInfoLink key={p.id} user={p.user} />
                ))
              }
            </Column>
          </Row>
        </>
      }
    </ModalWrapper>
  )
}