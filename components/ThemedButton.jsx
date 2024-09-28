import { Text, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function ThemedButton({ onPress, title = 'Save', disabled = false }) {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        button: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 8,
          paddingHorizontal: 24,
          borderRadius: 6,
          backgroundColor: disabled ? Colors[colorScheme ?? 'light'].buttonSecondaryDisabledBackground : Colors[colorScheme ?? 'light'].buttonSecondaryBackground,
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: disabled ? Colors['light'].buttonSecondaryDisabledBorder : "#06B2FF",
          overflow: "hidden",
          alignSelf: "center"
        }
      });

    return (
        <Pressable style={styles.button} onPress={onPress}>
            <ThemedText lightColor={disabled ? Colors['light'].buttonSecondaryDisabledText : "#06B2FF"} darkColor={disabled ? Colors['dark'].buttonSecondaryDisabledText : "#06B2FF"} type="defaultSemiBold">{title}</ThemedText>
        </Pressable>
    );
}

{/* <Pressable style={styles.button} onPress={onPress}>
<Image source={require('../assets/images/pixelGradient.png')} style={{ position: "absolute", left: 0, width: 120, height: 40 }} />
<ThemedText type="defaultSemiBold" style={{ color: "#0081f1"}}>{title}</ThemedText>
</Pressable> */}

