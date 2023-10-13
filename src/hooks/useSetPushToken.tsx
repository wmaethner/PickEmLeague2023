import { PushNotificationsApi } from "../apis";
import useApi from "./useApi";

export const useSetPushToken = async (token: string): Promise<void> => {
  const api = await useApi(PushNotificationsApi);
  return await api.putNotifications({ payload: { token } });
};