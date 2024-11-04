import { Text, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function DangerButton({ onPress, title = 'Save', disabled = false, ...rest }) {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        button: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 8,
          paddingHorizontal: 24,
          borderRadius: 6,
          backgroundColor: disabled ? Colors[colorScheme ?? 'light'].buttonDangerDisabledBackground : Colors[colorScheme ?? 'light'].buttonDangerBackground,
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: disabled ? Colors[colorScheme ?? 'light'].buttonDangerDisabledBorder : Colors[colorScheme ?? 'light'].buttonDangerBorder,
          overflow: "hidden",
          alignSelf: "center",
        }
      });

    return (
        <Pressable style={styles.button} onPress={onPress} {...rest}>
            <ThemedText lightColor={disabled ? Colors[colorScheme ?? 'light'].buttonDangerDisabledText : Colors[colorScheme ?? 'light'].buttonDangerText } darkColor={disabled ? Colors['dark'].buttonDangerDisabledText : Colors[colorScheme ?? 'light'].buttonDangerText } type="defaultSemiBold">{title}</ThemedText>
        </Pressable>
    );
}