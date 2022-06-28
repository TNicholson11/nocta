import { createSlice } from '@reduxjs/toolkit';

import { fetchUserData } from './usersThunks';
import { GenericState } from '../models/session.model';
import { UsersData } from '../models/users.model';

export const initialState: GenericState<UsersData> = {
  data: {
    userData: [],
  },
  isLoading: false,
  error: undefined,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Fetch Users
    builder.addCase(fetchUserData.fulfilled, ({ data }, { payload }) => {
      data.userData[payload.id] = payload.userData;
    });
    builder.addCase(fetchUserData.rejected, ({ data }, action) => {
      // @ts-ignore
      data.error = action.payload.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;
