import { ThemedText } from '@/components/ThemedText';
import { View } from 'react-native';
import { ThemedButton } from "@/components/ThemedButton";
import { useColorScheme } from '@/hooks/useColorScheme';
import Close from '../assets/svg/close.svg';

export function NewSession({setNewSession}) {
    return (
        <View style={{ backgroundColor: "white", width: "100%", height: "100%", borderRadius: 16, paddingTop: 8 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: 16, paddingBottom: 6, borderBottomWidth: 1, borderColor: "#E1E2E3" }}>
                <ThemedText type="header">New Session</ThemedText>
                <Close stroke={"black"} width={32} height={32} onPress={() => setNewSession(false)}></Close>
            </View>
        </View>
    )
}