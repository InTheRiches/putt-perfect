import { Text, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function ThemedButton({ onPress, title = 'Save', disabled = false, ...rest }) {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        button: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 8,
          paddingHorizontal: 24,
          borderRadius: 8,
          backgroundColor: disabled ? Colors[colorScheme ?? 'light'].buttonSecondaryDisabledBackground : Colors[colorScheme ?? 'light'].buttonPrimaryBackground,
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: disabled ? Colors[colorScheme ?? 'light'].buttonSecondaryDisabledBorder : Colors[colorScheme ?? 'light'].buttonPrimaryBorder,
          overflow: "hidden",
          alignSelf: "center"
        }
      });

    return (
        <Pressable style={styles.button} onPress={onPress} {...rest}>
            <ThemedText lightColor={disabled ? Colors[colorScheme ?? 'light'].buttonSecondaryDisabledText : Colors[colorScheme ?? 'light'].buttonPrimaryText } darkColor={disabled ? Colors['dark'].buttonSecondaryDisabledText : Colors[colorScheme ?? 'light'].buttonPrimaryText } type="defaultSemiBold">{title}</ThemedText>
        </Pressable>
    );
}

{/* <Pressable style={styles.button} onPress={onPress}>
<Image source={require('../assets/images/pixelGradient.png')} style={{ position: "absolute", left: 0, width: 120, height: 40 }} />
<ThemedText type="defaultSemiBold" style={{ color: "#0081f1"}}>{title}</ThemedText>
</Pressable> */}

