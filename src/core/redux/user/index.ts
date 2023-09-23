import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginInterface, UserInterface } from '../../../@types';
import { AccountInferface } from '../../../@types/IUser';

//login
export const LoginService = createAsyncThunk(
  'LoginServices',
  async (data: LoginInterface): Promise<UserInterface> => {
    //fetch data
    let user = await axios.post('http://localhost:5279/login', data).then(res => {
      if (res.data) {
        const user: UserInterface = {
          email: res.data.email,
          fullname: res.data.data.fullName,
        };
        return user;
      }
    });
    if (user) return user;
    return { email: '', fullname: '' };
  },
  //save data to store
);
// get data user
export const GetAllAccount = createAsyncThunk(
  'GetAllAccount',
  async (): Promise<AccountInferface[]> => {
    //fetch data
    let rooms = await axios.get('http://localhost:5279/api/Account').then(res => {
      if (res.data) {
        const data = res.data.map((e: any) => {
          const newData: AccountInferface = {
            key: e.accountId,
            fullName: e.fullName,
            email: e.email,
            img: e.img,
            phoneNumber: e.phoneNumber,
            userName: e.userName,
            password: e.password,
            status: e.status,
            roleId: e.roleId,
          };
          return newData;
        });
        return data;
      }
    });
    return rooms;
  },
  //save data to store
);

interface UserState {
  User: UserInterface;
}
interface AccountState {
  Accounts: AccountInferface[];
}

const initialUserState: UserState = {
  User: {
    email: '',
    fullname: '',
  },
};
const initialAccountState: AccountState = {
  Accounts: [],
};
export const UserSlice = createSlice({
  name: 'Users',
  initialState: initialUserState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(LoginService.fulfilled, (state, action) => {
      state.User = action.payload;
    });
  },
});
export const AccountSlice = createSlice({
  name: 'Accounts',
  initialState: initialAccountState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetAllAccount.fulfilled, (state, action) => {
      state.Accounts = action.payload;
    });
  },
});
