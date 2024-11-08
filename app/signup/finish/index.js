import {ThemedText} from "../../../components/ThemedText";
import {View, Text, Pressable, TextInput} from "react-native";
import {Colors} from "../../../constants/Colors";
import {useColorScheme} from "../../../hooks/useColorScheme";
import {useState} from "react";
import Svg, {Path} from "react-native-svg";
import {SvgArrow} from "../../../assets/svg/SvgComponents";
import {getAuth, updateProfile} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import {useRouter} from "expo-router";

const initialState = {
    skill: -1,
    frequency: -1,
    putts: -1,
    tab: 0,
    name: ""
}

export default function FinishSignup() {
    const colorScheme = useColorScheme();
    const db = getFirestore();
    const router = useRouter();
    const auth = getAuth();

    const [state, setState] = useState(initialState);

    const nextTab = () => {
        if (state.tab === 0 && state.skill === -1) return;
        if (state.tab === 1 && state.frequency === -1) return;
        if (state.tab === 2 && state.putts === -1) return;
        if (state.tab === 3 && state.name === "") return;

        if (state.tab === 4) {
            updateProfile(auth.currentUser, {
              displayName: state.name,
            }).then(() => {

            }).catch((error) => {

            });

            // Add a new document in collection "cities"
            setDoc(doc(db, `users/${auth.currentUser.uid}`), {
              name: state.name,
              skill: state.skill,
              frequency: state.frequency,
              putts: state.putts,
              date: new Date().toISOString(),
              totalPutts: 0
            }).then(() => {
                router.push({ pathname: `/` });
            });
        }

        setState(prevState => ({
            ...prevState,
            tab: prevState.tab + 1,
        }));
    }

    return (
        <View style={{ backgroundColor: Colors[colorScheme ?? "light"].backgroundColor, width: "100%", height: "100%", paddingTop: 50, paddingHorizontal: 24, justifyContent: "center", alignContent: "center" }}>
            {state.tab === 0 && <Skill colorScheme={colorScheme} state={state} setState={setState}/>}
            {state.tab === 1 && <Frequency colorScheme={colorScheme} state={state} setState={setState}/>}
            {state.tab === 2 && <Putts colorScheme={colorScheme} state={state} setState={setState}/>}
            {state.tab === 3 && <Name colorScheme={colorScheme} state={state} setState={setState}/>}
            {state.tab === 4 && <Done/>}
            <View style={{ display: state.tab === 5 ? "none" : "static", flexDirection: "row", justifyContent: "center", alignContent: "center" }}>
                <Pressable onPress={nextTab} style={{ backgroundColor: Colors[colorScheme ?? "light"].buttonPrimaryBorder, padding: 16, aspectRatio: 1, borderRadius: 50, marginTop: 48 }}>
                    <SvgArrow width={16} height={16} stroke={"white"} style={{ transform: [{ rotate: "45deg" }] }}></SvgArrow>
                </Pressable>
            </View>
        </View>
    )
}

function Skill({ colorScheme, state, setState }) {
    const setSkill = (id) => {
        setState(prevState => ({
            ...prevState,
            skill: id,
        }));
    }

    return (
        <View style={{ flexDirection: "column", gap: 10 }}>
            <ThemedText type={"title"} style={{ marginBottom: 30 }}>What is your skill level?</ThemedText>
            <Pressable onPress={() => setSkill(0)} style={{ borderWidth: 1, borderColor: state.skill === 0 ? Colors[colorScheme ?? "light"].buttonPrimaryBorder : Colors[colorScheme ?? "light"].border, backgroundColor: state.skill === 0 ? Colors[colorScheme ?? "light"].buttonPrimaryBackground : Colors[colorScheme ?? "light"].background, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12 }}>
                <Text style={{ color: Colors[colorScheme ?? "light"].text, fontSize: 18 }}>Hacker</Text>
                <Text style={{ color: Colors[colorScheme ?? "light"].textSecondary }}>25+ Handicap (or unknown)</Text>
                {state.skill === 0 && <SelectionCheck/>}
            </Pressable>
            <Pressable onPress={() => setSkill(1)} style={{ borderWidth: 1, borderColor: state.skill === 1 ? Colors[colorScheme ?? "light"].buttonPrimaryBorder : Colors[colorScheme ?? "light"].border, backgroundColor: state.skill === 1 ? Colors[colorScheme ?? "light"].buttonPrimaryBackground : Colors[colorScheme ?? "light"].background, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12 }}>
                <Text style={{ color: Colors[colorScheme ?? "light"].text, fontSize: 18 }}>Bogey Golf</Text>
                <Text style={{ color: Colors[colorScheme ?? "light"].textSecondary }}>10-25 Handicap</Text>
                {state.skill === 1 && <SelectionCheck/>}
            </Pressable>
            <Pressable onPress={() => setSkill(2)} style={{ borderWidth: 1, borderColor: state.skill === 2 ? Colors[colorScheme ?? "light"].buttonPrimaryBorder : Colors[colorScheme ?? "light"].border, backgroundColor: state.skill === 2 ? Colors[colorScheme ?? "light"].buttonPrimaryBackground : Colors[colorScheme ?? "light"].background, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12 }}>
                <Text style={{ color: Colors[colorScheme ?? "light"].text, fontSize: 18 }}>Single Digit</Text>
                <Text style={{ color: Colors[colorScheme ?? "light"].textSecondary }}>&lt;10 Handicap</Text>
                {state.skill === 2 && <SelectionCheck/>}
            </Pressable>
        </View>
    )
}

function Frequency({ colorScheme, state, setState }) {
    const setFrequency = (id) => {
        setState(prevState => ({
            ...prevState,
            frequency: id,
        }));
    }

    return (
        <View style={{ flexDirection: "column", gap: 10 }}>
            <ThemedText type={"title"} style={{ marginBottom: 30 }}>How often do you play?</ThemedText>
            <Pressable onPress={() => setFrequency(0)} style={{ borderWidth: 1, borderColor: state.frequency === 0 ? Colors[colorScheme ?? "light"].buttonPrimaryBorder : Colors[colorScheme ?? "light"].border, backgroundColor: state.frequency === 0 ? Colors[colorScheme ?? "light"].buttonPrimaryBackground : Colors[colorScheme ?? "light"].background, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12 }}>
                <Text style={{ color: Colors[colorScheme ?? "light"].text, fontSize: 18 }}>Occassionally</Text>
                <Text style={{ color: Colors[colorScheme ?? "light"].textSecondary }}>&lt;10 Rounds a year</Text>
                {state.frequency === 0 && <SelectionCheck/>}
            </Pressable>
            <Pressable onPress={() => setFrequency(1)} style={{ borderWidth: 1, borderColor: state.frequency === 1 ? Colors[colorScheme ?? "light"].buttonPrimaryBorder : Colors[colorScheme ?? "light"].border, backgroundColor: state.frequency === 1 ? Colors[colorScheme ?? "light"].buttonPrimaryBackground : Colors[colorScheme ?? "light"].background, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12 }}>
                <Text style={{ color: Colors[colorScheme ?? "light"].text, fontSize: 18 }}>Committed</Text>
                <Text style={{ color: Colors[colorScheme ?? "light"].textSecondary }}>10-30 Rounds a year </Text>
                {state.frequency === 1 && <SelectionCheck/>}
            </Pressable>
            <Pressable onPress={() => setFrequency(2)} style={{ borderWidth: 1, borderColor: state.frequency === 2 ? Colors[colorScheme ?? "light"].buttonPrimaryBorder : Colors[colorScheme ?? "light"].border, backgroundColor: state.frequency === 2 ? Colors[colorScheme ?? "light"].buttonPrimaryBackground : Colors[colorScheme ?? "light"].background, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12 }}>
                <Text style={{ color: Colors[colorScheme ?? "light"].text, fontSize: 18 }}>Addicted</Text>
                <Text style={{ color: Colors[colorScheme ?? "light"].textSecondary }}>30+ Rounds a year</Text>
                {state.frequency === 2 && <SelectionCheck/>}
            </Pressable>
        </View>
    )
}

function Putts({ colorScheme, state, setState }) {
    const setPutts = (id) => {
        setState(prevState => ({
            ...prevState,
            putts: id,
        }));
    }

    return (
        <View style={{ flexDirection: "column", gap: 10 }}>
            <ThemedText type={"title"} style={{ marginBottom: 30 }}>How many putts per round?</ThemedText>
            <Pressable onPress={() => setPutts(0)} style={{ borderWidth: 1, borderColor: state.putts === 0 ? Colors[colorScheme ?? "light"].buttonPrimaryBorder : Colors[colorScheme ?? "light"].border, backgroundColor: state.putts === 0 ? Colors[colorScheme ?? "light"].buttonPrimaryBackground : Colors[colorScheme ?? "light"].background, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12 }}>
                <Text style={{ color: Colors[colorScheme ?? "light"].text, fontSize: 18 }}>3 Putt Pro</Text>
                <Text style={{ color: Colors[colorScheme ?? "light"].textSecondary }}>40+ Putts</Text>
                {state.putts === 0 && <SelectionCheck/>}
            </Pressable>
            <Pressable onPress={() => setPutts(1)} style={{ borderWidth: 1, borderColor: state.putts === 1 ? Colors[colorScheme ?? "light"].buttonPrimaryBorder : Colors[colorScheme ?? "light"].border, backgroundColor: state.putts === 1 ? Colors[colorScheme ?? "light"].buttonPrimaryBackground : Colors[colorScheme ?? "light"].background, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12 }}>
                <Text style={{ color: Colors[colorScheme ?? "light"].text, fontSize: 18 }}>Average</Text>
                <Text style={{ color: Colors[colorScheme ?? "light"].textSecondary }}>30-40 Putts </Text>
                {state.putts === 1 && <SelectionCheck/>}
            </Pressable>
            <Pressable onPress={() => setPutts(2)} style={{ borderWidth: 1, borderColor: state.putts === 2 ? Colors[colorScheme ?? "light"].buttonPrimaryBorder : Colors[colorScheme ?? "light"].border, backgroundColor: state.putts === 2 ? Colors[colorScheme ?? "light"].buttonPrimaryBackground : Colors[colorScheme ?? "light"].background, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12 }}>
                <Text style={{ color: Colors[colorScheme ?? "light"].text, fontSize: 18 }}>Pro</Text>
                <Text style={{ color: Colors[colorScheme ?? "light"].textSecondary }}>&lt;30 Putts</Text>
                {state.putts === 2 && <SelectionCheck/>}
            </Pressable>
            <Pressable onPress={() => setPutts(3)} style={{ borderWidth: 1, borderColor: state.putts === 3 ? Colors[colorScheme ?? "light"].buttonPrimaryBorder : Colors[colorScheme ?? "light"].border, backgroundColor: state.putts === 3 ? Colors[colorScheme ?? "light"].buttonPrimaryBackground : Colors[colorScheme ?? "light"].background, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12 }}>
                <Text style={{ color: Colors[colorScheme ?? "light"].text, fontSize: 18 }}>No clue</Text>
                <Text style={{ color: Colors[colorScheme ?? "light"].textSecondary }}>We will just assume 30-40</Text>
                {state.putts === 3 && <SelectionCheck/>}
            </Pressable>
        </View>
    )
}

function Name({ colorScheme, state, setState }) {
    const setName = (id) => {
        setState(prevState => ({
            ...prevState,
            name: id,
        }));
    }

    const [nameFocused, setNameFocused] = useState(false);

    return (
        <View style={{ flexDirection: "column", gap: 10, flex: 0 }}>
            <ThemedText type={"title"} style={{ marginBottom: 30 }}>Whats your name?</ThemedText>
            <TextInput
                style={{ flex: 0, borderWidth: 1, borderColor: nameFocused ? Colors[colorScheme ?? "light"].buttonPrimaryBorder : Colors[colorScheme ?? "light"].buttonSecondaryBorder, borderRadius: 10, paddingVertical: 4, paddingHorizontal: 10, fontSize: 16, color: Colors[colorScheme ?? "light"].text, backgroundColor: Colors[colorScheme ?? "light"].buttonSecondaryBackground }}
                onFocus={() => setNameFocused(true)}
                onBlur={()=> setNameFocused(false)}
                value={state.name}
                onChangeText={(text) => setName(text)}
            />
        </View>
    )
}

function Done({}) {
    return (
        <View style={{ flexDirection: "row", gap: 10, flex: 0, justifyContent: "center" }}>
            <View style={{ backgroundColor: "#3EC264", padding: 4, borderRadius: 50, aspectRatio: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Svg width={18} height={18} stroke="white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                    <Path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </Svg>
            </View>
            <ThemedText type={"title"} style={{ flex: 0 }}>Your All Done!</ThemedText>
        </View>
    );
}

function SelectionCheck({}) {
    return (
        <View style={{ position: "absolute", right: -7, top: -7, backgroundColor: "#06B2FF", padding: 4, borderRadius: 50 }}>
            <Svg width={18} height={18} stroke="white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                <Path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </Svg>
        </View>
    )
}