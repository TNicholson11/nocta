import { TextInput as DefaultInput, Text as DefaultText, useColorScheme, View as DefaultView } from 'react-native';

import Colors from '../constants/Colors';

export function useThemeColor(props, colorName) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Input(props) {
  const { color, style, lightColor, darkColor, ...otherProps } = props;
  const themeColor = color || useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultInput style={[{ color: themeColor }, style]} placeholderTextColor={themeColor} {...otherProps} />;
}

export function Text(props) {
  const { color, style, lightColor, darkColor, ...otherProps } = props;
  const themeColor = color || useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color: themeColor }, style]} {...otherProps} />;
}

export function View(props) {
  const { color, style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = color || useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
