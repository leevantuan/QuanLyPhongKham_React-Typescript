import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { db } from '../../data';
import {
  AccountInferface,
  AddDeviceModalInterface,
  DataServiceDetailInterface,
  DeviceInterface,
  ListAccountInterface,
  ServiceInterface,
} from '../../@types';
import { HandleDates } from '../../HandleLogic';

export const accounts = query(collection(db, 'accounts'));
export const devices = query(collection(db, 'devices'));
export const services = query(collection(db, 'services'));
export const serviceDetail = query(collection(db, 'serviceDetail'));

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
//get data services detail
export const GetDataServicDetail = createAsyncThunk(
  'GetDataServicDetail',
  async (): Promise<DataServiceDetailInterface[]> => {
    const getDatas = await getDocs(serviceDetail);
    const servicesDetailData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = servicesDetailData.map((event: any) => {
      const dateData = event.date.toDate();
      const date = HandleDates(dateData);
      const newData: DataServiceDetailInterface = {
        key: event.id,
        serviceId: event.serviceId,
        status: event.status,
        stt: event.stt,
        date: date,
      };
      return newData;
    });
    return data;
  },
);
//get data services
export const GetDataServices = createAsyncThunk(
  'GetDataServices',
  async (): Promise<ServiceInterface[]> => {
    const getDatas = await getDocs(services);
    const servicesData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = servicesData.map((event: any) => {
      const newData: ServiceInterface = {
        key: event.id,
        serviceId: event.serviceId,
        serviceName: event.serviceId,
        online: event.online,
        describe: event.describe,
        rule: event.rule,
      };
      return newData;
    });
    return data;
  },
);

//update data devices
export const UpdateDataDevices = createAsyncThunk(
  'UpdateDataDevices',
  async (DataUpdate: DeviceInterface): Promise<DeviceInterface[]> => {
    //update data
    await updateDoc(doc(db, 'devices', `${DataUpdate.key}`), {
      ...{
        addressIP: DataUpdate.addressIP,
        deviceId: DataUpdate.deviceId,
        deviceName: DataUpdate.deviceName,
        deviceType: DataUpdate.deviceType,
        password: DataUpdate.password,
        userName: DataUpdate.userName,
        userService: DataUpdate.userService,
      },
    });
    //get data after update
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
//add data devices
export const AddDataDevices = createAsyncThunk(
  'AddDataDevices',
  async (DataAdd: AddDeviceModalInterface): Promise<DeviceInterface[]> => {
    //add data
    await addDoc(collection(db, 'devices'), {
      addressIP: DataAdd.addressIP,
      connect: true,
      deviceId: DataAdd.deviceId,
      deviceName: DataAdd.deviceName,
      deviceType: DataAdd.deviceType,
      online: true,
      password: DataAdd.password,
      userName: DataAdd.userName,
      userService: DataAdd.userService,
    });
    //get data after add
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
  Service: [],
  ServiceDetail: [],
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
      //device
      .addCase(GetDataDevices.fulfilled, (state, action) => {
        state.Device = action.payload;
      })
      .addCase(UpdateDataDevices.fulfilled, (state, action) => {
        state.Device = action.payload;
      })
      .addCase(AddDataDevices.fulfilled, (state, action) => {
        state.Device = action.payload;
      })
      //service
      .addCase(GetDataServices.fulfilled, (state, action) => {
        state.Service = action.payload;
      })
      //service detail
      .addCase(GetDataServicDetail.fulfilled, (state, action) => {
        state.ServiceDetail = action.payload;
      });
  },
});

const { actions, reducer } = AccountSlice;
export default reducer;
