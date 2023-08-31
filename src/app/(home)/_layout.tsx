import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/user';
import { useGetMisc } from '../../hooks/useGetMisc';
import WelcomeScreen from './welcome';

export default function Layout() {
  const [started, setStarted] = useState(false);
  const { UserData } = useUser();

  useEffect(() => {
    async function GetStarted() {
      const misc = await useGetMisc();
      await setStarted(misc.started);
    }
    GetStarted();

    console.log(`Userdata admin ${UserData?.admin}`);
  }, [])

  const tabView = () => (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'orange',
        tabBarStyle: {
          height: 70,
          borderWidth: 1,
          borderRadius: 50,
          borderColor: 'orange',
          borderTopColor: 'orange',
          backgroundColor: 'white',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          marginBottom: 10,
        },
      }}>
      <Tabs.Screen
        name='welcome'
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
    </Tabs>
  );

  return (
    started || UserData.admin ? tabView() : <WelcomeScreen />
  )
}