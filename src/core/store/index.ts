import { configureStore } from '@reduxjs/toolkit';
import {
  AccountSlice,
  RoomSlice,
  ServiceSlice,
  CapSoSlice,
  HistorySlice,
  RoleSlice,
  UserHistorySlice,
  DoctorSlice,
  BHYTSlice,
} from '../redux/index';

export const store = configureStore({
  // reducer: rootReducer,
  reducer: {
    Account: AccountSlice.reducer,
    Room: RoomSlice.reducer,
    Doctor: DoctorSlice.reducer,
    BHYT: BHYTSlice.reducer,
    Service: ServiceSlice.reducer,
    CapSo: CapSoSlice.reducer,
    History: HistorySlice.reducer,
    Role: RoleSlice.reducer,
    UserHistory: UserHistorySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
