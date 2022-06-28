import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabStack: {
            screens: {
              Sleepers: {
                screens: {
                  sleepers: 'SleepersScreen',
                },
              },
              Preferences: {
                screens: {
                  preferences: 'PreferencesScreen',
                },
              },
            },
          },
          Authentication: {},
        },
      },
    },
  },
};
