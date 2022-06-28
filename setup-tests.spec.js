// noinspection JSValidateTypes
import 'react-native-gesture-handler/jestSetup';

import MockAsyncStorage from 'mock-async-storage';

jest.mock('@react-native-async-storage/async-storage', () => new MockAsyncStorage());

jest.setTimeout(100000);
