import { MessagesApi } from "../../apis";
import useApi from "../useApi";


export const usePostMessage = async (message: string): Promise<void> => {
  const api = await useApi(MessagesApi);
  return await api.postMessageList({ text: message });
};