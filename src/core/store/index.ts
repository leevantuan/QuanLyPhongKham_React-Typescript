import { configureStore } from '@reduxjs/toolkit';
import {
  AccountSlice,
  DeviceSlice,
  ServiceSlice,
  ServiceDetailSlice,
  HistorySlice,
  RoleSlice,
  UserHistorySlice,
} from '../redux/index';

export const store = configureStore({
  // reducer: rootReducer,
  reducer: {
    Account: AccountSlice.reducer,
    Device: DeviceSlice.reducer,
    Service: ServiceSlice.reducer,
    ServiceDetail: ServiceDetailSlice.reducer,
    History: HistorySlice.reducer,
    Role: RoleSlice.reducer,
    UserHistory: UserHistorySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
