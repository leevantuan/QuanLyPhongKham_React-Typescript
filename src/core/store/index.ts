import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../redux/index';

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
