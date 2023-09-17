import { Dimensions, ScrollView, View } from "react-native";
import { Table, Row as TableRow } from 'react-native-reanimated-table';
import { GameSchema, SummarySchema } from "../apis";
import { BlueGrey } from "../utils/colors";
import { styles } from "../utils/styles";
import Row from "./layouts/row";
import UserInfoLink from "./userInfoLink";

export interface ScoreboardProps {
  summaries: SummarySchema[];
  games: GameSchema[];
}

export default function Scoreboard(props: ScoreboardProps) {
  const header = () => [
    '', 'Username', 'Score', 'Picks Correct'
  ]

  const widths = () => {
    const windowWidth = Dimensions.get('window').width;
    return [windowWidth * 0.1, windowWidth * 0.5, windowWidth * 0.2, windowWidth * 0.2]
  }

  const gamesPlayed = () => {
    return props.games.filter(g => g.result !== 1).length;
  }

  const mapSummary = (summary: SummarySchema, index: number) =>
    [
      index + 1,
      <UserInfoLink user={summary.user} />,
      summary.score,
      `${summary.correctPicks}/${gamesPlayed()}`
    ]

  return (
    <Row style={[styles.viewRow, { flex: 10, alignItems: 'flex-start' }]}>
      <View style={{ backgroundColor: BlueGrey.BlueGrey50 }}>
        <Table borderStyle={{ borderWidth: 1, borderColor: 'black' }}>
          <TableRow data={header()} widthArr={widths()} style={{ height: 40, backgroundColor: BlueGrey.BlueGrey600 }} textStyle={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }} />
        </Table>
        <ScrollView style={{ marginTop: -1, marginBottom: 0 }}>
          <Table borderStyle={{ borderWidth: 1, borderColor: 'black' }}>
            {props.summaries.map((summary, index) => (
              <TableRow
                key={index}
                data={mapSummary(summary, index)}
                widthArr={widths()}
                style={{ height: 30 }}
                textStyle={{ color: 'black', textAlign: 'center' }}
              />
            ))}
          </Table>
        </ScrollView>
      </View>
    </Row>
  )
}