import { Text, StyleSheet, Platform } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export function ThemedText({
  style,
  lightColor = undefined,
  darkColor = undefined,
  secondary = false,
  type = 'default',
  ...rest
}) {
  const color = useThemeColor(secondary ? 'textSecondary' : 'text', lightColor, darkColor);
  return (
    <Text
      style={[
        { color: color },
        type === 'default' ? styles.default : undefined,
        type === 'logo' ? styles.logo : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'header' ? styles.header : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '600',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 26,
  }
});
