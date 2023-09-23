import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RoleInterface } from '../../../@types/IRole';

//get data
export const GetAllRole = createAsyncThunk('GetAllRole', async (): Promise<RoleInterface[]> => {
  //fetch data
  let rooms = await axios.get('http://localhost:5279/api/Role').then(res => {
    if (res.data) {
      const data = res.data.map((e: any) => {
        const newData: RoleInterface = {
          key: e.roleId,
          roleName: e.roleName,
          describe: e.describe,
          status: e.status,
        };
        return newData;
      });
      return data;
    }
  });
  return rooms;
});

interface RoleState {
  Roles: RoleInterface[];
}

const initialRoleState: RoleState = {
  Roles: [],
};
export const RoleSlice = createSlice({
  name: 'Roles',
  initialState: initialRoleState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetAllRole.fulfilled, (state, action) => {
      state.Roles = action.payload;
    });
  },
});
