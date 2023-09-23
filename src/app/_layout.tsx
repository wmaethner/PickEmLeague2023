import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Slot } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Platform, SafeAreaView } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import AppBackground from '../components/appBackground';
import { AuthProvider } from '../context/auth';
import { LoggingProvider } from '../context/logging';
import { UserProvider } from '../context/user';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default function Root() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification>(null);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification)
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    // Setup the auth context and render our layout inside of it.
    <LoggingProvider>
      <UserProvider>
        <AuthProvider>
          <MenuProvider>
            <AppBackground>
              <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
                <Slot />
              </SafeAreaView>
            </AppBackground>
          </MenuProvider>
        </AuthProvider>
      </UserProvider>
    </LoggingProvider>
  );
}
