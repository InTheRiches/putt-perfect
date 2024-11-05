import {Pressable, TextInput, View} from "react-native";
import {useColorScheme} from "../../hooks/useColorScheme";
import {Colors} from "../../constants/Colors";
import {ThemedText} from "../../components/ThemedText";
import {SvgGoogle} from "../../assets/svg/SvgComponents";
import {useState} from "react";
import {ThemedButton} from "../../components/ThemedButton";

export default function Signup() {
    const colorScheme = useColorScheme();

    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

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
            <TextInput
            style={{ borderWidth: 1, borderColor: emailFocused ? Colors[colorScheme ?? "light"].buttonPrimaryBorder : Colors[colorScheme ?? "light"].buttonSecondaryBorder, borderRadius: 10, paddingVertical: 4, paddingHorizontal: 10, fontSize: 16, color: Colors[colorScheme ?? "light"].text, backgroundColor: Colors[colorScheme ?? "light"].buttonSecondaryBackground }}
            onFocus={() => setEmailFocused(true)}
            onBlur={()=> setEmailFocused(false)}
            />

            <ThemedText style={{ fontSize: 16, marginTop: 16, marginBottom: 4 }}>Password</ThemedText>
            <TextInput
            style={{ borderWidth: 1, borderColor: passwordFocused ? Colors[colorScheme ?? "light"].buttonPrimaryBorder : Colors[colorScheme ?? "light"].buttonSecondaryBorder, borderRadius: 10, paddingVertical: 4, paddingHorizontal: 10, fontSize: 16, color: Colors[colorScheme ?? "light"].text, backgroundColor: Colors[colorScheme ?? "light"].buttonSecondaryBackground }}
            onFocus={() => setPasswordFocused(true)}
            onBlur={()=> setPasswordFocused(false)}
            />

            <Pressable style={{ flex: 1, paddingVertical: 12, borderRadius: 10, flexDirection: "row", alignContent: "center", justifyContent: "center", backgroundColor: Colors[colorScheme ?? "light"].buttonPrimaryBorder }}>
                <ThemedText type={"default"}>Create Your Account</ThemedText>
            </Pressable>
        </View>
    </View>
    )
}