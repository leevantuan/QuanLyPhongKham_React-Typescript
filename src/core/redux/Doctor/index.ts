import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AddDoctorsInterface, DoctorsInterface } from '../../../@types/IDoctor';

//get data
export const GetAllDoctor = createAsyncThunk(
  'GetAllDoctor',
  async (): Promise<DoctorsInterface[]> => {
    //fetch data
    let rooms = await axios.get('http://localhost:5279/api/Doctor').then(res => {
      if (res.data) {
        const data = res.data.map((e: any) => {
          const newData: DoctorsInterface = {
            key: e.doctorId,
            doctorName: e.doctorName,
            phoneNumber: e.phoneNumber,
            address: e.address,
            birthDay: e.birthDay,
            dateWork: e.dateWork,
            professtional: e.professtional,
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
export const UpdateDataDoctor = createAsyncThunk(
  'UpdateDataDoctor',
  async (data: DoctorsInterface) => {
    //fetch data
    await axios.put(`http://localhost:5279/api/Doctor/${data.key}`, {
      doctorId: data.key,
      doctorName: data.doctorName,
      phoneNumber: data.phoneNumber,
      address: data.address,
      birthDay: data.birthDay,
      dateWork: data.dateWork,
      professtional: data.professtional,
      status: data.status,
      roomId: data.roomId,
    });
  },
);
//create data
export const CreateDataDoctor = createAsyncThunk(
  'CreateDataDoctor',
  async (data: AddDoctorsInterface) => {
    //fetch data
    await axios.post(`http://localhost:5279/api/Doctor`, {
      doctorName: data.doctorName,
      phoneNumber: data.phoneNumber,
      address: data.address,
      birthDay: data.birthDay,
      dateWork: data.dateWork,
      professtional: data.professtional,
      status: data.status,
      roomId: data.roomId,
    });
  },
);

interface DoctorState {
  Doctors: DoctorsInterface[];
}

const initialDoctorState: DoctorState = {
  Doctors: [],
};
export const DoctorSlice = createSlice({
  name: 'Doctors',
  initialState: initialDoctorState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetAllDoctor.fulfilled, (state, action) => {
      state.Doctors = action.payload;
    });
  },
});
