import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BHYTInterface } from '../../../@types/IBHYT';

//get data
export const GetAllBHYT = createAsyncThunk('GetAllBHYT', async (): Promise<BHYTInterface[]> => {
  //fetch data
  let rooms = await axios.get('http://localhost:5279/api/BHYT').then(res => {
    if (res.data) {
      const data = res.data.map((e: any) => {
        const newData: BHYTInterface = {
          key: e.bhytId,
          fullName: e.fullName,
          phoneNumber: e.phoneNumber,
          address: e.address,
          birthday: e.birthday,
          professtion: e.professtion,
          startDate: e.startDate,
          endDate: e.endDate,
          status: e.status,
        };
        return newData;
      });
      return data;
    }
  });
  return rooms;
});

interface BHYTState {
  BHYTS: BHYTInterface[];
}

const initialBHYTState: BHYTState = {
  BHYTS: [],
};
export const BHYTSlice = createSlice({
  name: 'BHYTS',
  initialState: initialBHYTState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetAllBHYT.fulfilled, (state, action) => {
      state.BHYTS = action.payload;
    });
  },
});
