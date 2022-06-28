import { TouchableOpacity, useColorScheme, View } from 'react-native';

import Colors from '../constants/Colors';
import { StyledText } from './StyledText';

export type StyledButtonProps = {
  onPress?: (param?: any) => void;
  title?: string;
  disabled?: boolean;
  color?: string;
  type?: 'default' | 'secondary';
};

export function StyledButton(props: StyledButtonProps) {
  const theme = useColorScheme();

  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={{
        backgroundColor: props.type === 'secondary' ? Colors[theme].buttonBackgroundSecondary : Colors[theme].buttonBackground,
        alignSelf: 'auto',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: Colors[theme].border,
        margin: 8,
        padding: 12,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={props.onPress}>
      <View style={{ alignItems: 'center' }}>
        <StyledText
          bold
          style={{
            color: props.type === 'secondary' ? Colors[theme].buttonTextSecondary : Colors[theme].buttonText,
            textAlign: 'center',
            flexGrow: 0,
          }}>
          {props.title}
        </StyledText>
      </View>
    </TouchableOpacity>
  );
}
