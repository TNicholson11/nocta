import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../redux';
import { handleLoadingCondition } from '../common';

export interface FetchUserDataPayload {
  id: string;
  userData: any;
}

export type FetchUserDataParams = {
  id: string;
};

const USER_DATA_SOURCES = {
  '1': 'https://s3.amazonaws.com/eight-public/challenge/2228b530e055401f81ba37b51ff6f81d.json',
  '2': 'https://s3.amazonaws.com/eight-public/challenge/d6c1355e38194139b8d0c870baf86365.json',
  '3': 'https://s3.amazonaws.com/eight-public/challenge/f9bf229fd19e4c799e8c19a962d73449.json',
};

export const fetchUserData = createAsyncThunk<FetchUserDataPayload, FetchUserDataParams, { state: RootState }>(
  'users/fetchUserData',

  async ({ id }, { rejectWithValue }) => {
    try {
      if (!id) throw Error('id required');

      const result = await fetch(USER_DATA_SOURCES[id], {
        method: 'GET',
      });
      const userData = await result.json();

      return { id, userData };
    } catch (error: any) {
      return rejectWithValue({
        error: { message: error.message },
      });
    }
  },
  {
    condition: (_, { getState }) =>
      handleLoadingCondition({
        getState,
        reducer: 'users',
        state: 'data',
      }),
  },
);
