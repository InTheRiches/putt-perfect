import { Text, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function ThemedButton({ onPress, title = 'Save' }) {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        button: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 4,
          elevation: 3,
          backgroundColor: Colors[colorScheme ?? 'light'].buttonSecondaryBackground,
          borderStyle: "solid",
          borderWidth: 0.5,
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.1)",
          borderColor: Colors[colorScheme ?? 'light'].buttonSecondaryBorder
        }
      });

    return (
      <Pressable style={styles.button} onPress={onPress}>
        <ThemedText style={styles.text} type="defaultSemiBold">{title}</ThemedText>
      </Pressable>
    );
}

