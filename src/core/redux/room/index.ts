import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RoomsInterface } from '../../../@types/IRoom';

//get data
export const GetAllRoom = createAsyncThunk('GetAllRoom', async (): Promise<RoomsInterface[]> => {
  //fetch data
  let rooms = await axios.get('http://localhost:5279/api/Room').then(res => {
    if (res.data) {
      const data = res.data.map((e: any) => {
        const newData: RoomsInterface = {
          key: e.roomId,
          roomName: e.roomName,
          status: e.status,
        };
        return newData;
      });
      return data;
    }
  });
  return rooms;
});

//update data
export const UpdateDataRoom = createAsyncThunk('UpdateData', async (data: RoomsInterface) => {
  //fetch data
  await axios.put(`http://localhost:5279/api/Room/${data.key}`, {
    roomId: data.key,
    roomName: data.roomName,
    status: data.status,
  });
});

interface RoomState {
  Rooms: RoomsInterface[];
}

const initialRoomState: RoomState = {
  Rooms: [],
};
export const RoomSlice = createSlice({
  name: 'Rooms',
  initialState: initialRoomState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetAllRoom.fulfilled, (state, action) => {
      state.Rooms = action.payload;
    });
  },
});
