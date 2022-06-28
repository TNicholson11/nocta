export const handleLoadingCondition = ({ getState, reducer, state }: { getState: () => any; reducer: string; state: string }) => {
  return !getState()[reducer][state].isLoading;
};
