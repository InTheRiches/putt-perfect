import {Pressable, Text, TextInput, View} from "react-native";
import {useColorScheme} from "../../hooks/useColorScheme";
import {Colors} from "../../constants/Colors";
import {ThemedText} from "../../components/ThemedText";
import {SvgGoogle} from "../../assets/svg/SvgComponents";
import {useState} from "react";
import {ThemedButton} from "../../components/ThemedButton";
import Svg, {Path} from "react-native-svg";

const initialState = {
    email: "",
    password: ""
}

export default function Signup() {
    const colorScheme = useColorScheme();

    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);

    const [requirements, setRequirements] = useState({
        hasLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
      });

    const [state, setState] = useState(initialState)

    const [password, setPassword] = useState("");

    const validateEmail = (newEmail) => {
        const re = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
        setInvalidEmail(!re.test(newEmail));
    }

    const validatePassword = (newPassword) => {
        const re = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/;
        setInvalidPassword(!re.test(newPassword))

        setRequirements({
            hasLength: newPassword.length >= 6,
            hasUppercase: /[A-Z]/.test(newPassword),
            hasLowercase: /[a-z]/.test(newPassword),
            hasNumber: /[0-9]/.test(newPassword),
          });
    }

    const updateEmail = (email) => {
        setState(prevState => ({
            ...prevState,
            email: email,
          }));

        validateEmail(email);
    }

    const updatePassword = (password) => {
        setState(prevState => ({
            ...prevState,
            password: password,
        }));

        validatePassword(password);
    }
    return (
    <View style={{ backgroundColor: Colors[colorScheme ?? "light"].backgroundColor, width: "100%", height: "100%", paddingTop: 50, paddingHorizontal: 24, justifyContent: "center", alignContent: "center" }}>
        <View>
            <ThemedText type={"title"} style={{ marginBottom: 30 }}>Create Your Account</ThemedText>
            <ThemedText style={{ fontSize: 16, marginBottom: 4 }}>Create with:</ThemedText>
            <View style={{ flexDirection: "row", gap: 12, width: "100%", marginBottom: 12, }}>
                <Pressable style={{ flex:1, paddingVertical: 12, borderRadius: 10, flexDirection: "row", alignContent: "center", justifyContent: "center", borderWidth: 1, borderColor: Colors[colorScheme ?? "light"].buttonSecondaryBorder, backgroundColor: Colors[colorScheme ?? "light"].buttonSecondaryBackground }}>
                    <SvgGoogle fill={Colors[colorScheme ?? "light"].buttonSecondaryText} style={{ width: 24, height: 24 }}></SvgGoogle>
                </Pressable>
                <Pressable style={{ flex: 1, paddingVertical: 12, borderRadius: 10, flexDirection: "row", alignContent: "center", justifyContent: "center", borderWidth: 1, borderColor: Colors[colorScheme ?? "light"].buttonSecondaryBorder, backgroundColor: Colors[colorScheme ?? "light"].buttonSecondaryBackground }}>
                    <SvgGoogle fill={Colors[colorScheme ?? "light"].buttonSecondaryText} style={{ width: 24, height: 24 }}></SvgGoogle>
                </Pressable>
            </View>
            <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
                <View style={{ height: 1, flex: 1, backgroundColor: Colors[colorScheme ?? "light"].textSecondary, marginTop: 12 }}></View>
                <ThemedText style={{ fontSize: 16 }} secondary={true}>Or continue with</ThemedText>
                <View style={{ height: 1, flex: 1, backgroundColor: Colors[colorScheme ?? "light"].textSecondary, marginTop: 12}}></View>
            </View>

            <ThemedText style={{ fontSize: 16, marginTop: 12, marginBottom: 4 }}>Email Address</ThemedText>
            <View style={{ flexDirection: "row" }}>
                <TextInput
                    style={{ flex: 1, borderWidth: 1, borderColor: emailFocused ? invalidEmail ? Colors[colorScheme ?? "light"].inputInvalidFocusedBorder : Colors[colorScheme ?? "light"].inputFocusedBorder : invalidEmail ? Colors[colorScheme ?? "light"].inputInvalidBorder : Colors[colorScheme ?? "light"].inputBorder, borderRadius: 10, paddingVertical: 4, paddingHorizontal: 10, fontSize: 16, color: invalidEmail ? Colors[colorScheme ?? "light"].inputInvalidText : Colors[colorScheme ?? "light"].text, backgroundColor: invalidEmail ? Colors[colorScheme ?? "light"].inputInvalidBackground : Colors[colorScheme ?? "light"].inputBackground }}
                    onFocus={() => setEmailFocused(true)}
                    value={state.email}
                    onBlur={() => setEmailFocused(false)}
                    onChangeText={(text) => updateEmail(text)}
                />
                {invalidEmail && <Text style={{ position: "absolute", right: 12, top: 7.5, color: "white", backgroundColor: "#EF4444", borderRadius: 50, aspectRatio: 1, width: 22, textAlign: "center", fontSize: 16 }}>!</Text>}
            </View>

            <ThemedText style={{ fontSize: 16, marginTop: 16, marginBottom: 4 }}>Password</ThemedText>
            <View style={{ flexDirection: "row", marginBottom: 12 }}>
                <TextInput
                        style={{ flex: 1, borderWidth: 1, borderColor: passwordFocused ? invalidPassword ? Colors[colorScheme ?? "light"].inputInvalidFocusedBorder : Colors[colorScheme ?? "light"].buttonPrimaryBorder : invalidPassword ? Colors[colorScheme ?? "light"].inputInvalidBorder : Colors[colorScheme ?? "light"].buttonSecondaryBorder, borderRadius: 10, paddingVertical: 4, paddingHorizontal: 10, fontSize: 16, color: invalidPassword ? Colors[colorScheme ?? "light"].inputInvalidText : Colors[colorScheme ?? "light"].text, backgroundColor: invalidPassword ? Colors[colorScheme ?? "light"].inputInvalidBackground : Colors[colorScheme ?? "light"].buttonSecondaryBackground }}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={()=> setPasswordFocused(false)}
                        secureTextEntry={true}
                        value={state.password}
                        onChangeText={(text) => updatePassword(text)}
                />
                {invalidPassword && <Text style={{ position: "absolute", right: 12, top: 7.5, color: "white", backgroundColor: "#EF4444", borderRadius: 50, aspectRatio: 1, width: 22, textAlign: "center", fontSize: 16 }}>!</Text>}
            </View>
            <ThemedText>Password Requirements:</ThemedText>
            <View style={{ flexDirection: "row", gap: 10, alignContent: "center"}}>
                { requirements.hasLength ? <ValidRequirement/> : <InvalidRequirement/> }
                <Text style={{ color: requirements.hasLength ? '#16a34a' : Colors[colorScheme ?? "light"].inputInvalidText }}>At least 6 characters</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 10, alignContent: "center"}}>
                { requirements.hasNumber ? <ValidRequirement/> : <InvalidRequirement/> }
                <Text style={{ color: requirements.hasNumber ? '#16a34a' : Colors[colorScheme ?? "light"].inputInvalidText }}>At least 1 number</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 10, alignContent: "center"}}>
                { requirements.hasUppercase ? <ValidRequirement/> : <InvalidRequirement/> }
                <Text style={{ color: requirements.hasUppercase ? '#16a34a' : Colors[colorScheme ?? "light"].inputInvalidText }}>Contains an uppercase</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 10, alignContent: "center"}}>
                { requirements.hasLowercase ? <ValidRequirement/> : <InvalidRequirement/> }
                <Text style={{ color: requirements.hasLowercase ? '#16a34a' : Colors[colorScheme ?? "light"].inputInvalidText }}>Contains a lowercase</Text>
            </View>

            <Pressable style={{ paddingVertical: 10, borderRadius: 10, marginTop: 48, backgroundColor: Colors[colorScheme ?? "light"].buttonPrimaryBorder }}>
                <Text style={{ textAlign: "center", color: "white" }}>Create your account</Text>
            </Pressable>
        </View>
    </View>
    )
}

function InvalidRequirement() {
    return (
        <Text style={{ color: "white", backgroundColor: "#EF4444", borderRadius: 50, aspectRatio: 1, width: 18, textAlign: "center", fontSize: 12 }}>!</Text>
    )
}

function ValidRequirement() {
    return (
        <Svg width={16} height={16} stroke="#16a34a" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3">
            <Path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </Svg>
    )
}