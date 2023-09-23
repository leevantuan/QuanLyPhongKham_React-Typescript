import { configureStore } from '@reduxjs/toolkit';
import { UserSlice } from '../redux/user/index';
import { RoomSlice } from '../redux/room/index';
import { DoctorSlice } from '../redux/Doctor';
import { ServiceSlice } from '../redux/Service';
import { BHYTSlice } from '../redux/BHYT';
import { ProvideNumberSlice } from '../redux/ProvideNumber';
import { RoleSlice } from '../redux/Role';
import { AccountSlice } from '../redux/user/index';
export const store = configureStore({
  // reducer: rootReducer,
  reducer: {
    Room: RoomSlice.reducer,
    Doctor: DoctorSlice.reducer,
    BHYT: BHYTSlice.reducer,
    Service: ServiceSlice.reducer,
    ProvideNumber: ProvideNumberSlice.reducer,
    Role: RoleSlice.reducer,
    User: UserSlice.reducer,
    Account: AccountSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
