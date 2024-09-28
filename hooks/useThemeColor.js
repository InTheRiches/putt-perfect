/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/Colors';

export function useThemeColor(
  colorName, lightColor = undefined, darkColor = undefined
) {
  if (lightColor == undefined || darkColor == undefined) {
    return Colors[useColorScheme() ?? 'light'][colorName];
  }
  
  return useColorScheme() ?? 'light' === 'light' ? lightColor : darkColor;
}
