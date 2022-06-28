import { SerializedError } from '@reduxjs/toolkit';

export interface GenericState<T = any> {
  data: T;
  isLoading: boolean;
  error: SerializedError | undefined;
}

export type SessionData = {
  isLoaded: boolean;
  token: string;
};
