import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../redux';
import { handleLoadingCondition } from '../common';

export interface AuthSignInPayload {
  token: string;
}

export type AuthSignInParams = {
  email: string;
  password: string;
};

export const signIn = createAsyncThunk<AuthSignInPayload, AuthSignInParams, { state: RootState }>(
  'session/fetchSignIn',

  async ({ email, password }, { rejectWithValue }) => {
    try {
      if (!email || !password) throw Error('Email and Password required');

      return { token: '123' };
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
        reducer: 'session',
        state: 'data',
      }),
  },
);
