import { ActivityIndicator, Platform, ScrollView, useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

import { View } from '../../components/Themed';
import { useAppDispatch, useAppSelector } from '../../redux';
import { fetchUserData } from '../../features/users/usersThunks';
import SleeperData from './SleeperData';
import Colors from '../../constants/Colors';
import { SleepData, SleepInterval } from '../../features/models/users.model';

export default function SleeperScene(id: string) {
  const [index, setIndex] = useState<number>(0);
  const theme = useColorScheme();
  const dispatch = useAppDispatch();
  const {
    data: { userData },
  } = useAppSelector(state => state.users);

  const sleepData: SleepData = userData?.[id];

  useEffect(() => {
    dispatch(fetchUserData({ id }));
  }, []);

  const formatDate = (date: string) => {
    const formattedDate = new Date(date);
    return `${formattedDate.toLocaleString('default', { month: 'long' }).toLowerCase()} ${formattedDate.getDate().toString()}`;
  };

  return (
    <ScrollView style={{ backgroundColor: Colors[theme].background }}>
      <View style={{ flex: 1 }}>
        <SegmentedControl
          values={sleepData?.intervals?.map((interval: SleepInterval) => formatDate(interval.ts))}
          selectedIndex={index}
          onChange={event => {
            setIndex(event.nativeEvent.selectedSegmentIndex);
          }}
          fontStyle={{
            color: Colors[theme].textSecondary,
            fontFamily: Platform.select({
              default: 'Courier',
              ios: 'Courier New',
              android: 'monospace',
            }),
            fontWeight: '500',
            fontSize: 16,
          }}
          style={{ margin: 24, borderColor: Colors[theme].border, borderWidth: 2, backgroundColor: Colors[theme].background }}
          tintColor={Colors[theme].tint}
        />

        <SleeperData interval={sleepData?.intervals[index]} />
      </View>
    </ScrollView>
  );
}
