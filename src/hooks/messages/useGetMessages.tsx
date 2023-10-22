import { MessageSchema, MessagesApi } from "../../apis";
import useApi from "../useApi";

export const useGetMessages = async (): Promise<MessageSchema[]> => {
  const api = await useApi(MessagesApi);
  return (await api.getMessageList()).data;
};
