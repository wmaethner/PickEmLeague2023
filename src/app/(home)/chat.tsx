import moment from 'moment';
import { useEffect, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, Text, TextInput } from 'react-native';
import { MessageSchema } from '../../apis';
import Column from '../../components/layouts/column';
import Container from '../../components/layouts/container';
import Row from '../../components/layouts/row';
import { useGetMessages } from '../../hooks/messages/useGetMessages';
import { usePostMessage } from '../../hooks/messages/usePostMessage';
import { Blue, BlueGrey } from '../../utils/colors';
import { styles } from '../../utils/styles';

export default function Chat() {
  const [messages, setMessages] = useState<MessageSchema[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [checkForMessages, setCheckForMessages] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function GetMessages() {
      setMessages((await useGetMessages()));
      setCheckForMessages(false);
      setRefreshing(false);
    }

    if (checkForMessages) {
      GetMessages();
    }
  }, [checkForMessages])

  function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
  }

  const onRefresh = () => {
    setRefreshing(true);
    setCheckForMessages(true);
  }

  const handleSendMessage = async () => {
    if (!isEmpty(newMessage)) {
      await usePostMessage(newMessage);
      setCheckForMessages(true);
      setNewMessage('');
    }
  }

  const chatMessage = (message: MessageSchema) => (
    <Row key={message.id} style={[styles.viewRow, { paddingBottom: 5, borderBottomWidth: 1 }]}>
      <Column style={[styles.viewColumn, { borderWidth: 0, alignItems: 'flex-start' }]}>
        <Row>
          <Text style={[styles.darkText, { fontWeight: 'bold' }]}>{message.user.username}</Text>
          <Text style={{color: BlueGrey.BlueGrey300}}> [{moment(message.createdAt).format('MMM D h:mm A')}]</Text>
        </Row>
        <Row>
          <Text style={styles.darkText}>{message.text}</Text>
        </Row>
      </Column>
    </Row>
  )

  const buttonColor = () => {
    return isEmpty(newMessage) ? 'gray' : Blue.Blue500;
  }

  return (
    <Container>
      <Row style={[styles.viewRow, { flex: 2, justifyContent: 'center', alignItems: 'flex-start' }]}>
        <Column style={[styles.viewColumn, { alignItems: 'flex-end', backgroundColor: 'lightgray', paddingHorizontal: 4 }]}>
          <Row style={[styles.viewRow, { flexGrow: 2, alignItems: 'stretch', justifyContent: 'center', paddingTop: 4 }]}>
            <TextInput
              style={{ flex: 1, borderWidth: 1, backgroundColor: 'ghostwhite' }}
              onChangeText={setNewMessage}
              value={newMessage}
              autoCapitalize='none'
              multiline={true}
            />
          </Row>
          <Row style={[styles.viewRow, { flex: 1, alignItems: 'center' }]}>
            <Pressable
              style={[styles.button, { paddingVertical: 1, backgroundColor: buttonColor() }]}
              disabled={isEmpty(newMessage)}
              onPress={handleSendMessage}>
              <Text style={styles.text}>Send</Text>
            </Pressable>
          </Row>
        </Column>
      </Row>
      <Row style={[styles.viewRow, { flex: 12, alignItems: 'stretch', borderWidth: 1 }]}>
        <ScrollView 
        style={{ margin: 5, flexGrow: 1 }} 
        keyboardShouldPersistTaps='handled'
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {messages.map(message => chatMessage(message))}
        </ScrollView>
      </Row>
    </Container>
  )
}