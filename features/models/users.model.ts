export interface SleepTimeSeries {
  tnt: [string, number][];
  tempRoomC: [string, number][];
  tempBedC: [string, number][];
  respiratoryRate: [string, number][];
  heartRate: [string, number][];
  heating: [string, number][];
}

export interface SleepStage {
  stage: 'awake' | 'light' | 'deep' | 'out';
  duration: number;
}

export interface SleepInterval {
  id: string;
  ts: string;
  stages: SleepStage[];
  score: number;
  timeseries: SleepTimeSeries;
}

export interface SleepData {
  intervals: SleepInterval[];
}

export type UsersData = {
  userData: SleepData[];
};
