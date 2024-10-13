import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

export function Checkbox() {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        checkboxBase: {
          width: 24,
          height: 24,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
          borderWidth: 2,
          borderColor: Colors[colorScheme ?? 'light'].border,
          backgroundColor: Colors[colorScheme ?? 'light'].backgroundSecondary,
        },
        checkboxChecked: {
          backgroundColor: Colors[colorScheme ?? 'light'].buttonPrimaryBorder,
          borderColor: Colors[colorScheme ?? 'light'].buttonPrimaryBorder,
        },
    });

    const [checked, setChecked] = useState(false);
    return (
      <Pressable
        style={[styles.checkboxBase, checked && styles.checkboxChecked]}
        onPress={() => setChecked(!checked)}>
        {checked && 
            <Svg stroke="white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                <Path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </Svg>
        }
      </Pressable>
    );
}
