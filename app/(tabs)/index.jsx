import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from "@/components/ThemedButton";
import { useColorScheme } from '@/hooks/useColorScheme';


export default function HomeScreen() {
  const colorScheme = useColorScheme();

  return (
      <ThemedView className="flex-1 items-center flex-col px-6 pt-16 gap-4 overflow-hidden">
        <ThemedView className="flex-row mb-4 items-start w-full">
          <ThemedText type="logo">PuttPerfect</ThemedText>
        </ThemedView>
        <ThemedView className="flex-col mb-4">
          <ThemedText className="mb-4" type="title">Recent Sessions</ThemedText>
          <ThemedView className={"border items-center rounded-lg border-solid p-12 py-[40px] " + (colorScheme == 'light' ? "bg-background-secondary-light border-border-light" : "border-border-dark bg-background-secondary-dark")}>
            <ThemedText type="subtitle">No sessions</ThemedText>
            <ThemedText secondary = {true} className="text-center mb-8">Start a session to simulate 18 holes of make or break putts.</ThemedText>
            <ThemedButton onPress={() => console.log("hey")} title="New session"></ThemedButton>
          </ThemedView>
        </ThemedView>
        <ThemedView className="flex-col">
          <ThemedText className="mb-4" type="title">Chipping</ThemedText>
          <ThemedView className={"border items-center rounded-lg border-solid p-12 py-[40px] " + (colorScheme == 'light' ? "bg-background-secondary-light border-border-light" : "border-border-dark bg-background-secondary-dark")}>
            <ThemedText type="subtitle">No activity</ThemedText>
            <ThemedText secondary = {true} className="text-center mb-8">Record a chipping seesion to see them here.</ThemedText>
            <ThemedButton onPress={() => console.log("hey")} title="Record Chipping"></ThemedButton>
          </ThemedView>
        </ThemedView>
      </ThemedView>
  );
}