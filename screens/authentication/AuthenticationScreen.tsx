import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, KeyboardAvoidingView, StyleSheet, useColorScheme, View } from 'react-native';
import { StyledInput } from '../../components/StyledInput';
import { StyledText } from '../../components/StyledText';
import { StyledButton } from '../../components/StyledButton';
import { useAppDispatch } from '../../redux';
import { signIn } from '../../features/session/sessionThunk';
import Colors from '../../constants/Colors';

type AuthMode = 'sign-in' | 'sign-up';

export default function AuthenticationScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(75)).current;
  const [authMode, setAuthMode] = useState<AuthMode>();
  const dispatch = useAppDispatch();
  const theme = useColorScheme();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 750,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() =>
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(),
    );
  }, [slideAnim]);

  const handleSignIn = () => {
    if (authMode === 'sign-in') {
      // Sign in logic
      dispatch(signIn({ email: 'blah', password: 'blah' }));
    } else {
      setAuthMode('sign-in');
    }
  };

  const handleSignUp = () => {
    if (authMode === 'sign-up') {
      // Sign up logic
      dispatch(signIn({ email: 'blah', password: 'blah' }));
    } else {
      setAuthMode('sign-up');
    }
  };

  return (
    <View style={styles(theme).container}>
      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
        }}>
        <StyledText style={styles(theme).title}>nocta</StyledText>
      </Animated.View>

      <KeyboardAvoidingView style={styles(theme).inputContainer}>
        {authMode ? (
          <>
            <StyledInput placeholder={'enter email'} textContentType={'emailAddress'} autoCapitalize={'none'} spellCheck={false} />
            <StyledInput placeholder={'enter password'} textContentType={'password'} secureTextEntry={true} autoCapitalize={'none'} />
          </>
        ) : null}
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}>
          {authMode !== 'sign-up' ? <StyledButton title={'sign in'} onPress={handleSignIn} /> : null}
          {authMode !== 'sign-in' ? <StyledButton title={'sign up'} type={'secondary'} onPress={handleSignUp} /> : null}
        </Animated.View>
      </KeyboardAvoidingView>
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
    title: {
      alignSelf: 'center',
      fontSize: 44,
      fontWeight: 'bold',
    },
    inputContainer: {
      flexDirection: 'column',
      padding: 32,
    },
  });
};
