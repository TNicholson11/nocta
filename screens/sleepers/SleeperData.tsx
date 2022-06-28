import { useState } from 'react';
import { ActivityIndicator, useColorScheme } from 'react-native';
import { VictoryChart, VictoryLine } from 'victory-native';

import { View } from '../../components/Themed';
import { StyledText } from '../../components/StyledText';
import { StyledButton } from '../../components/StyledButton';
import Colors from '../../constants/Colors';
import { SleepInterval, SleepStage } from '../../features/models/users.model';

export interface SleepViewProps {
  interval: SleepInterval;
}

type DataMode = 'biometrics' | 'environment' | 'stages';

const formatDate = (date: string) => {
  return `${new Date(date).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })}`;
};

const reduceData = (data: [string, number][]) => {
  return data.reduce((acc, item) => {
    if (acc) {
      acc.push({ x: formatDate(item[0]), y: item[1] });
    }
    return acc;
  }, []);
};

const reduceStages = (data: SleepStage[]) => {
  let duration = 0;
  return data.reduce((acc, item) => {
    if (acc) {
      const x = (duration += item.duration);
      acc.push({ x, y: item.stage });
    }
    return acc;
  }, []);
};

export default function SleeperData(props: SleepViewProps) {
  const [mode, setMode] = useState<DataMode>('biometrics');
  const theme = useColorScheme();

  if (!props.interval) return <ActivityIndicator size={'large'} animating={true} color={'purple'} />;

  // biometrics
  const rateRespiratory = reduceData(props.interval.timeseries.respiratoryRate);
  const rateHeart = reduceData(props.interval.timeseries.heartRate);

  // environment
  const tempBedData = reduceData(props.interval.timeseries.tempBedC);
  const tempRoomData = reduceData(props.interval.timeseries.tempRoomC);

  // stages
  const stageData = reduceStages(props.interval.stages);

  const renderButton = (buttonMode: DataMode) => {
    return <StyledButton title={buttonMode} type={mode === buttonMode ? 'default' : 'secondary'} onPress={() => setMode(buttonMode)} />;
  };

  const renderLine = (data, color = Colors[theme].tint) => {
    return (
      // @ts-ignore
      <VictoryLine
        data={data}
        animate={{
          duration: 1000,
        }}
        style={{
          data: { stroke: color },
          parent: { border: '1px solid #ccc' },
        }}
      />
    );
  };

  const renderLegend = () => {
    switch (mode) {
      case 'biometrics':
        return (
          <View style={{ padding: 16, alignItems: 'center' }}>
            <StyledText color={'red'}>heart rate</StyledText>
            <StyledText>respiratory rate</StyledText>
          </View>
        );
      case 'environment':
        return (
          <View style={{ padding: 16, alignItems: 'center' }}>
            <StyledText color={'red'}>bed temp</StyledText>
            <StyledText>room temp</StyledText>
          </View>
        );
      case 'stages':
        return (
          <View style={{ padding: 16, alignItems: 'center' }}>
            <StyledText>sleep stage</StyledText>
          </View>
        );
    }
  };

  const chartTheme = {
    axis: {
      style: {
        tickLabels: {
          fill: 'white',
          fontSize: 12,
        },
      },
    },
  };

  return (
    <View key={props.interval.id} style={{ alignItems: 'center' }}>
      <StyledText style={{ fontSize: 48 }}>{props.interval.score}</StyledText>
      <StyledText style={{ fontSize: 20 }}>Sleep Score</StyledText>
      <VictoryChart theme={chartTheme} padding={32} domainPadding={{ y: 48 }}>
        {mode === 'biometrics' ? renderLine(rateHeart, 'red') : null}
        {mode === 'biometrics' ? renderLine(rateRespiratory) : null}
        {mode === 'environment' ? renderLine(tempBedData, 'red') : null}
        {mode === 'environment' ? renderLine(tempRoomData) : null}
        {mode === 'stages' ? renderLine(stageData) : null}
      </VictoryChart>
      {renderLegend()}
      <View style={{ flexDirection: 'row' }}>
        {renderButton('biometrics')}
        {renderButton('environment')}
        {renderButton('stages')}
      </View>
    </View>
  );
}
