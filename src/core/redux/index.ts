import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { db } from '../../data';
import {
  AccountInferface,
  AccountLoginInterface,
  DeviceInterface,
  ListAccountInterface,
} from '../../@types';
import { HandleCheckLogin } from '../../HandleLogic/index';

export const accounts = query(collection(db, 'accounts'));
export const devices = query(collection(db, 'devices'));

//get data accouts
export const AccountLogin = createAsyncThunk(
  'AccountLogin',
  async (): Promise<AccountInferface[]> => {
    const getDatas = await getDocs(accounts);
    const accountsData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = accountsData.map((event: any) => {
      const newData: AccountInferface = {
        id: event.id,
        myFullName: event.myFullName,
        userName: event.userName,
        phoneNumber: event.phoneNumber,
        password: event.password,
        email: event.email,
        role: event.role,
        img: event.img,
        state: event.state,
      };
      return newData;
    });
    return data;
  },
);

//get data devices
export const GetDataDevices = createAsyncThunk(
  'GetDataDevices',
  async (): Promise<DeviceInterface[]> => {
    const getDatas = await getDocs(devices);
    const accountsData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = accountsData.map((event: any) => {
      const newData: DeviceInterface = {
        key: event.id,
        addressIP: event.addressIP,
        connect: event.connect,
        deviceId: event.deviceId,
        deviceName: event.deviceName,
        deviceType: event.deviceType,
        online: event.online,
        password: event.password,
        userName: event.userName,
        userService: event.userService,
      };
      return newData;
    });
    return data;
  },
);
const initialState: ListAccountInterface = {
  Account: [],
  Device: [],
};
const AccountSlice = createSlice({
  name: 'Queuing_system',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(AccountLogin.fulfilled, (state, action) => {
        state.Account = action.payload;
      })
      .addCase(GetDataDevices.fulfilled, (state, action) => {
        state.Device = action.payload;
      });
  },
});

const { actions, reducer } = AccountSlice;
export default reducer;
