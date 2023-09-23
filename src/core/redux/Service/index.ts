import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AddServiceInterface, ServiceInterface } from '../../../@types/IService';

//get data
export const GetAllService = createAsyncThunk(
  'GetAllService',
  async (): Promise<ServiceInterface[]> => {
    //fetch data
    let rooms = await axios.get('http://localhost:5279/api/Service').then(res => {
      if (res.data) {
        const data = res.data.map((e: any) => {
          const newData: ServiceInterface = {
            key: e.serviceId,
            serviceName: e.serviceName,
            price: e.price,
            status: e.status,
            roomId: e.roomId,
          };
          return newData;
        });
        return data;
      }
    });
    return rooms;
  },
);

//update data
export const UpdateDataService = createAsyncThunk(
  'UpdateDataService',
  async (data: ServiceInterface) => {
    //fetch data
    await axios.put(`http://localhost:5279/api/Service/${data.key}`, {
      serviceId: data.key,
      serviceName: data.serviceName,
      price: data.price,
      status: data.status,
      roomId: data.roomId,
    });
  },
);

//create data
export const CreateDataService = createAsyncThunk(
  'CreateDataService',
  async (data: AddServiceInterface) => {
    //fetch data
    await axios.post(`http://localhost:5279/api/Service`, {
      serviceName: data.serviceName,
      price: data.price,
      status: data.status === 'true' ? true : false,
      roomId: data.roomId,
    });
  },
);

interface ServiceState {
  Services: ServiceInterface[];
}

const initialServiceState: ServiceState = {
  Services: [],
};
export const ServiceSlice = createSlice({
  name: 'Services',
  initialState: initialServiceState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetAllService.fulfilled, (state, action) => {
      state.Services = action.payload;
    });
  },
});
