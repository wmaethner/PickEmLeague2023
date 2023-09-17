import { Modal, Pressable, Text, View } from "react-native";
import { GamePickSchema, GameSchema } from "../../apis";
import { BlueGrey } from "../../utils/colors";
import { styles } from "../../utils/styles";
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
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.open}
      onRequestClose={props.close}
      style={{ borderColor: 'black', borderWidth: 2, marginHorizontal: 0 }}
    >
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: BlueGrey.BlueGrey500, padding: 10, borderRadius: 10, marginHorizontal: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 0, margin: 0 }}>
            <Pressable style={[styles.button, { paddingVertical: 5, paddingHorizontal: 10 }]} onPress={props.close}>
              <Text style={styles.text}>X</Text>
            </Pressable>
          </View>
          {
            props.game &&
            <>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.viewColumn}>
                  <Text style={styles.title}>{props.game.awayTeam.name}</Text>
                </View>
                <View style={styles.viewColumn}>
                  <Text style={styles.title}>{props.game.homeTeam.name}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.viewColumn}>
                  {
                    filteredPicks(3).map(p => (
                      <UserInfoLink key={p.id} user={p.user} />
                    ))
                  }
                </View>
                <View style={styles.viewColumn}>
                  {
                    filteredPicks(2).map(p => (
                      <UserInfoLink key={p.id} user={p.user} />
                    ))
                  }
                </View>
              </View>
            </>
          }
        </View>
      </View>
    </Modal>
  )
}