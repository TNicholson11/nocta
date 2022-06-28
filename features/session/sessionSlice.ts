import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { signIn } from './sessionThunk';
import { GenericState, SessionData } from '../models/session.model';

export const initialState: GenericState<SessionData> = {
  data: {
    isLoaded: false,
    token: undefined,
  },
  isLoading: false,
  error: undefined,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setAppLoaded(state, action: PayloadAction<boolean>) {
      state.data.isLoaded = action.payload;
    },
    signOut(state, _action: PayloadAction<null>) {
      state.data.token = undefined;
    },
  },
  extraReducers: builder => {
    // Sign In
    builder.addCase(signIn.fulfilled, ({ data }, { payload }) => {
      data.token = payload.token;
    });
    builder.addCase(signIn.rejected, ({ data }, action) => {
      // @ts-ignore
      data.error = action.payload.error;
    });
  },
});

export const { setAppLoaded, signOut } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
