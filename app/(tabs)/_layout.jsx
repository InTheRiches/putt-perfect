import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SvgHome, SvgPractice } from '@/assets/svg/SvgComponents';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].buttonPrimaryBorder,
        tabBarActiveBackgroundColor: Colors[colorScheme ?? 'light'].background,
        tabBarInactiveBackgroundColor: Colors[colorScheme ?? 'light'].background,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <SvgHome stroke={focused ? Colors[colorScheme ?? 'light'].buttonPrimaryBorder : Colors[colorScheme ?? 'light'].border} fill={focused ? Colors[colorScheme ?? 'light'].buttonPrimaryBackground : Colors[colorScheme ?? 'light'].border} width={25} height={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Practice',
          tabBarIcon: ({ color, focused }) => (
            <SvgPractice stroke={focused ? Colors[colorScheme ?? 'light'].buttonPrimaryBorder : Colors[colorScheme ?? 'light'].border} fill={focused ? Colors[colorScheme ?? 'light'].buttonPrimaryBackground : "transparent"} width={25} height={25} />
          ),
        }}
      />
    </Tabs>
  );
}
