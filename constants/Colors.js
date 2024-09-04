/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    textSecondary: "#687076",
    background: '#fff',
    backgroundSecondary: "background-secondary-light",
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    border: "border-secondary-light",
    buttonSecondaryBackground: "#202425",
    buttonSecondaryBorder: "#4c5155"
  },
  dark: {
    text: '#ECEDEE',
    textSecondary: "#9ba1a6",
    background: '#0c0d0e',
    backgroundSecondary: "background-secondary-dark",
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    border: 'border-secondary-dark',
    buttonSecondaryBackground: "#202425",
    buttonSecondaryBorder: "#4c5155"
  },
};
