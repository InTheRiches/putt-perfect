import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { View } from 'react-native';
import { ThemedButton } from "@/components/ThemedButton";
import { useColorScheme } from '@/hooks/useColorScheme';
import Profile from '../../assets/svg/profile.svg';
import { Image } from 'react-native';

import { Colors } from '@/constants/Colors';
import {SvgLogo, SvgMenu} from '../../assets/svg/SvgComponents';

import  { NewSession } from '@/components/NewSession';
import React, { useState } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const [ newSession, setNewSession ] = useState(false);

  return (
    <ThemedView className="flex-1 items-center flex-col pt-12 overflow-hidden">
      <ThemedView style={{ borderColor: Colors[colorScheme ?? 'light'].border }} className={"flex-row mb-6 items-center justify-between w-full border-b-[1px] pb-4 px-6"}>
        <SvgLogo></SvgLogo>
        <SvgMenu></SvgMenu>
      </ThemedView>
      <ThemedView className={"px-6"}>
        <ThemedView className="flex-col mb-4">
          <ThemedText className="mb-4" type="title">Recent Sessions</ThemedText>
          <ThemedView style={{ borderColor: Colors[colorScheme ?? 'light'].border }} className={"border items-center rounded-lg border-solid p-12 py-[40px]"}>
            <ThemedText type="subtitle">No sessions</ThemedText>
            <ThemedText secondary = {true} className="text-center mb-8">Start a session to simulate 18 holes of make or break putts.</ThemedText>
            <ThemedButton onPress={() => setNewSession(true)} title="New session"></ThemedButton>
          </ThemedView>
        </ThemedView>
      </ThemedView>
      {newSession && <View className="absolute inset-0 flex items-center justify-center z-50 h-screen w-full" style={{ backgroundColor: colorScheme == 'light' ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.8)" }}>
        <NewSession setNewSession={setNewSession}></NewSession>
      </View>}
    </ThemedView>
  );
}