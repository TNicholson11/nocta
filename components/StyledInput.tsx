import { Platform, TextInputProps, useColorScheme } from 'react-native';

import { Input } from './Themed';
import Colors from '../constants/Colors';

export function StyledInput(props: TextInputProps) {
  const theme = useColorScheme();

  return (
    <Input
      {...props}
      style={[
        props.style,
        {
          fontFamily: Platform.select({
            default: 'Courier',
            ios: 'Courier New',
            android: 'monospace',
          }),
          fontWeight: '500',
          borderWidth: 1,
          borderRadius: 4,
          borderColor: Colors[theme].border,
          margin: 8,
          padding: 12,
        },
      ]}
    />
  );
}
