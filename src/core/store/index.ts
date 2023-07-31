import { configureStore } from '@reduxjs/toolkit';
import AccountSlice from '../redux/index';

export const store = configureStore({
  reducer: {
    queuing_system: AccountSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
