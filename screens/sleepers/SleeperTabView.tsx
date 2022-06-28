import { useState } from 'react';
import { useWindowDimensions, useColorScheme } from 'react-native';
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';
import Ionicons from '@expo/vector-icons/Ionicons';

import Colors from '../../constants/Colors';
import { StyledText } from '../../components/StyledText';
import SleeperScene from './SleeperScene';

const renderScene = SceneMap({
  first: () => SleeperScene('1'),
  second: () => SleeperScene('2'),
  third: () => SleeperScene('3'),
});

export default function SleeperTabView() {
  const { width } = useWindowDimensions();
  const theme = useColorScheme();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'john' },
    { key: 'second', title: 'jane' },
    { key: 'third', title: 'junior' },
  ]);

  const renderTabIcon = ({ focused, color }) => <Ionicons size={18} name={focused ? 'person' : 'person-outline'} color={color} />;

  const renderTabLabel = ({ route, color }) => (
    <StyledText size={18} color={color}>
      {route.title}
    </StyledText>
  );

  const renderTabBar = props => (
    <TabBar
      {...props}
      activeColor={Colors[theme].tabIconSelected}
      inactiveColor={Colors[theme].tabIconDefault}
      indicatorStyle={{ backgroundColor: Colors[theme].tabIconSelected }}
      style={{ backgroundColor: Colors[theme].tabBarBackground }}
      renderIcon={renderTabIcon}
      renderLabel={renderTabLabel}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={{ width }}
    />
  );
}
