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

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const [ newSession, setNewSession ] = useState(false);

  return (
    <ThemedView className="flex-1 items-center flex-col pt-16 overflow-hidden">
      <ThemedView style={{ borderColor: Colors[colorScheme ?? 'light'].border}} className={"flex-row mb-6 items-center justify-between w-full border-b-[1px] pb-4 px-6"}>
        <SvgLogo></SvgLogo>
        <SvgMenu></SvgMenu>
      </ThemedView>
      <ThemedView className={"px-6"}>
        <ThemedView style={{ borderColor: Colors[colorScheme ?? 'light'].border}} className={"flex-row items-center justify-between w-full border-b-[1px] pb-6 mb-10"}>
          <ThemedView className={"flex-row items-center"}>
            <Profile width={64} height={64}></Profile>
            <ThemedView className={"ml-2"}>
              <ThemedText type="subtitle">Hayden Williams</ThemedText>
              <ThemedText type="default">Since 2024</ThemedText>
              <ThemedText type="default">84 Sessions</ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView className="flex-col items-center justify-center">
            <ThemedView  style={{ overflow: "hidden"}} type="secondary" className={"w-[56px] h-[56px] rounded-full items-center justify-center border-[1px] mb-1 border-[#96c7f2]"}>
            <Image source={require('../../assets/images/pixelGradient.png')} style={{ position: "absolute", left: 0, width: 60, height: 60, zIndex: 10 }} />
              <ThemedText type="header" style={{ lineHeight: 26, zIndex: 20, color: "#0081f1" }}>1.8</ThemedText>
            </ThemedView>
            <ThemedText type="defaultSemiBold" style={{ fontSize: 16 }}>Strokes Gained</ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView className="flex-col mb-4">
          <ThemedText className="mb-4" type="title">Recent Sessions</ThemedText>
          <ThemedView className={"border items-center rounded-lg border-solid p-12 py-[40px] " + (colorScheme == 'light' ? "bg-background-secondary-light border-border-light" : "border-border-dark bg-background-secondary-dark")}>
            <ThemedText type="subtitle">No sessions</ThemedText>
            <ThemedText secondary = {true} className="text-center mb-8">Start a session to simulate 18 holes of make or break putts.</ThemedText>
            <ThemedButton onPress={() => setNewSession(true)} title="New session"></ThemedButton>
          </ThemedView>
        </ThemedView>
      </ThemedView>
      {newSession && <View className="absolute inset-0 flex items-center justify-center z-50 h-screen w-full" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", paddingLeft: 48, paddingRight: 48, paddingTop: 180, paddingBottom: 250 }}>
        <NewSession setNewSession={setNewSession}></NewSession>
      </View>}
    </ThemedView>
  );
}