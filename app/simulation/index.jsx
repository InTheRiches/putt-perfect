import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from "@/components/ThemedButton";
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLocalSearchParams } from 'expo-router';

import { Colors } from '@/constants/Colors';
import {SvgLogo, SvgMenu} from '../../assets/svg/SvgComponents';

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const item = useLocalSearchParams();

  console.log(item);

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
    </ThemedView>
  );
}