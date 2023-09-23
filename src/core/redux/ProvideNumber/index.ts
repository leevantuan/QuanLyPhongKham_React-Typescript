import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProvideNumberInterface } from '../../../@types/IProvideNumber';

//get data
export const GetAllProvideNumber = createAsyncThunk(
  'GetAllProvideNumber',
  async (): Promise<ProvideNumberInterface[]> => {
    //fetch data
    let rooms = await axios.get('http://localhost:5279/api/ProvideNumber').then(res => {
      if (res.data) {
        const data = res.data.map((e: any) => {
          const newData: ProvideNumberInterface = {
            key: e.provideNumberId,
            fullName: e.fullName,
            phoneNumber: e.phoneNumber,
            startDate: e.startDate,
            endtDate: e.endtDate,
            price: e.price,
            status: e.status,
            serviceId: e.serviceId,
          };
          return newData;
        });
        return data;
      }
    });
    return rooms;
  },
);

interface ProvideNumberState {
  ProvideNumbers: ProvideNumberInterface[];
}

const initialProvideNumberState: ProvideNumberState = {
  ProvideNumbers: [],
};
export const ProvideNumberSlice = createSlice({
  name: 'ProvideNumbers',
  initialState: initialProvideNumberState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetAllProvideNumber.fulfilled, (state, action) => {
      state.ProvideNumbers = action.payload;
    });
  },
});
