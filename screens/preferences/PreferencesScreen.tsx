import { StyleSheet, useColorScheme } from 'react-native';

import { View } from '../../components/Themed';
import { StyledButton } from '../../components/StyledButton';
import { useAppDispatch } from '../../redux';
import { signOut } from '../../features/session/sessionSlice';
import Colors from '../../constants/Colors';

export default function PreferencesScreen() {
  const dispatch = useAppDispatch();
  const theme = useColorScheme();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <View style={styles(theme).container}>
      <StyledButton title={'sign out'} onPress={handleSignOut} />
    </View>
  );
}

const styles = theme => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background,
      justifyContent: 'center',
      padding: 20,
    },
  });
};
