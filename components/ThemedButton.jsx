import { Text, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';

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
          borderRadius: 6,
          elevation: 3,
          backgroundColor: Colors[colorScheme ?? 'light'].buttonSecondaryBackground,
          borderStyle: "solid",
          borderWidth: 0.5,
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.1)",
          borderColor: "#96c7f2",
          overflow: "hidden",          
        }
      });

    return (
        <Pressable style={styles.button} onPress={onPress}>
          <Image source={require('../assets/images/pixelGradient.png')} style={{ position: "absolute", left: 0, width: 120, height: 40 }} />
          <ThemedText type="defaultSemiBold" style={{ color: "#0081f1"}}>{title}</ThemedText>
        </Pressable>
    );
}

