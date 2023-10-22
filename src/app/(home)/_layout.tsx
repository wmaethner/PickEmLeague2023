import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Header from '../../components/header';
import { useUser } from '../../context/user';
import { useGetMisc } from '../../hooks/useGetMisc';
import { BlueGrey } from '../../utils/colors';
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
  }, [])

  const picksTabBadgeProps = (): BottomTabNavigationOptions => {
    if (true) {
      // return { tabBarBadge: '!', tabBarBadgeStyle: { backgroundColor: 'orange' } };
      return { tabBarBadge: null, tabBarBadgeStyle: { backgroundColor: 'orange' } };
    }
    // return { tabBarBadge: '!', tabBarBadgeStyle: { backgroundColor: 'red' } };
  }

  // TODO: Add admin tabs (edit games)
  // TODO: Add user profile page/tab
  const tabView = () => (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          unmountOnBlur: true,
          tabBarActiveTintColor: BlueGrey.BlueGrey50,
          tabBarActiveBackgroundColor: BlueGrey.BlueGrey500,
          tabBarInactiveTintColor: BlueGrey.BlueGrey500,
          tabBarStyle: {
            height: 40,
            borderWidth: 1,
            paddingBottom: 0,
            backgroundColor: 'white',
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
          header: () => <Header />
        }}>
        <Tabs.Screen
          name='home'
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            )
          }}
        />
        <Tabs.Screen
          name='picks'
          options={{
            tabBarLabel: 'Picks',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="sort-bool-descending-variant" color={color} size={size} />
            ),
            ...picksTabBadgeProps()
          }}
        />
        <Tabs.Screen
          name='season'
          options={{
            tabBarLabel: 'Season',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="podium" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="message1" size={size} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="games"
          options={{
            tabBarLabel: 'Games',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="book" color={color} size={size} />
            ),
            href: (UserData.admin ? 'games' : null)
          }}
        />
        <Tabs.Screen
          name='welcome'
          options={{
            // This tab will no longer show up in the tab bar.
            href: null,
          }}
        />
      </Tabs>
    </View>
  );

  return (
    started || UserData.admin ? tabView() : <WelcomeScreen />
  )
}