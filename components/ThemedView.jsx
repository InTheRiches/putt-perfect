import { View } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export function ThemedView({ style, type, ...otherProps }) {

  const backgroundColor = useThemeColor(type == "secondary" ? 'backgroundSecondary' : 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
