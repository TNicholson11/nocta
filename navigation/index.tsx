import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import AuthenticationScreen from '../screens/authentication/AuthenticationScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import { useAppSelector, persistor, store } from '../redux';

export default function Navigation({ colorScheme }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <RootNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const Stack = createStackNavigator();

function RootNavigator() {
  const {
    data: { token },
  } = useAppSelector(state => state.session);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <Stack.Screen name="TabStack" component={BottomTabNavigator} />
      ) : (
        <Stack.Screen name="Authentication" component={AuthenticationScreen} />
      )}
    </Stack.Navigator>
  );
}
