import { ThemedText } from '@/components/ThemedText';
import { View } from 'react-native';
import { HorizRadioButton } from '@/components/HorizRadioButton';
import Close from '../assets/svg/close.svg';
import React, { useState } from 'react';
import { ThemedButton } from "@/components/ThemedButton";

export function NewSession({setNewSession}) {
    const [holes, setHoles] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [mode, setMode] = useState(null);

    return (
        <View style={{ backgroundColor: "white", width: "100%", height: "100%", borderRadius: 16, paddingTop: 8 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: 'center', width: "100%", paddingHorizontal: 20, paddingTop: 2, paddingBottom: 6, borderBottomWidth: 1, borderColor: "#E1E2E3" }}>
                <ThemedText type="title">New Session</ThemedText>
                <Close stroke={"black"} width={32} height={32} onPress={() => setNewSession(false)}></Close>
            </View>
            <View style={{ flexDirection: "column", alignContent: "center" }}>
                <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
                    <ThemedText type="header">Holes</ThemedText>
                    <HorizRadioButton options={["9 Holes", "18 Holes"]} selectedOption={holes} setSelectedOption={setHoles}></HorizRadioButton>
                </View>
                <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
                    <ThemedText type="header">Difficulty</ThemedText>
                    <HorizRadioButton options={["Easy", "Medium", "Hard"]} selectedOption={difficulty} setSelectedOption={setDifficulty}></HorizRadioButton>
                </View>
                <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
                    <ThemedText type="header">Mode</ThemedText>
                    <HorizRadioButton options={["Random", "Mistakes"]} selectedOption={mode} setSelectedOption={setMode}></HorizRadioButton>
                </View>
                <View style={{ width: "100%", alignContent: "center", justifyContent: "center", marginTop: 20

                 }}>
                    <ThemedButton onPress={() => setNewSession(true)} title="Start" disabled={holes == undefined || difficulty == undefined || mode == undefined}></ThemedButton>
                </View>
            </View>
        </View>
    )
}