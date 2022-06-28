import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Platform, useColorScheme } from 'react-native';

import Colors from '../constants/Colors';
import SleeperTabView from '../screens/sleepers/SleeperTabView';
import PreferencesScreen from '../screens/preferences/PreferencesScreen';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="sleepers"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].tabBarBackground,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: Platform.select({
            default: 'Courier',
            ios: 'Courier New',
            android: 'monospace',
          }),
          fontWeight: '500',
        },
        headerTitleContainerStyle: { marginBottom: 16 },
        // @ts-ignore
        headerStyle: {
          backgroundColor: Colors[colorScheme].tabBarBackground,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
        },
        headerTitleStyle: {
          color: Colors[colorScheme].tabIconSelected,
          fontSize: 24,
          fontFamily: Platform.select({
            default: 'Courier',
            ios: 'Courier New',
            android: 'monospace',
          }),
          fontWeight: '500',
        },
      }}>
      <BottomTab.Screen
        name="sleepers"
        component={SleepersNavigator}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          tabBarIcon: ({ color }) => <TabBarIcon name="bed-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="preferences"
        component={PreferencesNavigator}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          tabBarIcon: ({ color }) => <TabBarIcon name="cog-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const SleepersStack = createStackNavigator();

function SleepersNavigator() {
  return (
    <SleepersStack.Navigator>
      <SleepersStack.Screen name="SleepersScreen" component={SleeperTabView} options={{ headerShown: false }} />
    </SleepersStack.Navigator>
  );
}

const PreferencesStack = createStackNavigator();

function PreferencesNavigator() {
  return (
    <PreferencesStack.Navigator>
      <PreferencesStack.Screen name="PreferencesScreen" component={PreferencesScreen} options={{ headerShown: false }} />
    </PreferencesStack.Navigator>
  );
}
