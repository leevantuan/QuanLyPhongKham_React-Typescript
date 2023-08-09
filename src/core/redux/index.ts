import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { db } from '../../data';
import {
  AccountInferface,
  AddDataAccountInferface,
  AddDataServiceInterface,
  AddDeviceModalInterface,
  AddHistoryInterface,
  AddRoleInterface,
  AddUserHistoryInterface,
  DataAddServiceDetailInterface,
  DataServiceDetailInterface,
  DeviceInterface,
  HistoryInterface,
  ResetPasswordInterface,
  RoleInterface,
  ServiceInterface,
  UpdateDataAccountInferface,
  UpdateDataServiceInterface,
  UserHistoryInterface,
} from '../../@types';
import { HandleDates, HandleTimes } from '../../HandleLogic';

export const accounts = query(collection(db, 'accounts'));
export const devices = query(collection(db, 'devices'));
export const services = query(collection(db, 'services'));
export const serviceDetail = query(collection(db, 'serviceDetail'));
export const historys = query(collection(db, 'historys'));
export const roles = query(collection(db, 'roles'));
export const userHistory = query(collection(db, 'userHistory'));

//get data accouts
export const AccountLogin = createAsyncThunk(
  'AccountLogin',
  async (): Promise<AccountInferface[]> => {
    const getDatas = await getDocs(accounts);
    const accountsData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = accountsData.map((event: any) => {
      const newData: AccountInferface = {
        key: event.id,
        myFullName: event.myFullName,
        userName: event.userName,
        phoneNumber: event.phoneNumber,
        password: event.password,
        email: event.email,
        role: event.role,
        img: event.img,
        status: event.status,
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
      //covert
      const dateData = event.date.toDate();
      const toDateData = event.toDate.toDate();
      const date = HandleDates(dateData);
      const time = HandleTimes(dateData);
      const toDate = HandleDates(toDateData);
      const toTime = HandleTimes(toDateData);

      const newData: DataServiceDetailInterface = {
        key: event.id,
        serviceId: event.serviceId,
        status: event.status,
        stt: event.stt,
        date: date,
        serviceName: event.serviceName,
        toDate: toDate,
        customerName: event.customerName,
        email: event.email,
        phoneNumber: event.phoneNumber,
        source: event.source,
        time: time,
        toTime: toTime,
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
        serviceName: event.serviceName,
        online: event.online,
        describe: event.describe,
        rule: event.rule,
      };
      return newData;
    });
    return data;
  },
);
//get data historys
export const GetDataHistorys = createAsyncThunk(
  'GetDataHistorys',
  async (): Promise<HistoryInterface[]> => {
    const getDatas = await getDocs(historys);
    const historysData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = historysData.map((event: any) => {
      //covert
      const dateData = event.dateTime.toDate();
      const date = HandleDates(dateData);
      const time = HandleTimes(dateData);
      const newData: HistoryInterface = {
        key: event.id,
        userName: event.userName,
        date: date,
        time: time,
      };
      return newData;
    });
    return data;
  },
);
//get data roles
export const GetDataRoles = createAsyncThunk('GetDataRoles', async (): Promise<RoleInterface[]> => {
  const getDatas = await getDocs(roles);
  const rolesData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

  const data = rolesData.map((event: any) => {
    const newData: RoleInterface = {
      key: event.id,
      roleName: event.roleName,
      describe: event.describe,
      authorization: event.authorization,
      authorization2: event.authorization2,
    };
    return newData;
  });
  return data;
});
//get data user history
export const GetDataUserHistorys = createAsyncThunk(
  'GetDataUserHistorys',
  async (): Promise<UserHistoryInterface[]> => {
    const getDatas = await getDocs(userHistory);
    const userHistoryData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = userHistoryData.map((event: any) => {
      //covert
      const dateData = event.dateTime.toDate();
      const date = HandleDates(dateData);
      const time = HandleTimes(dateData);
      const newData: UserHistoryInterface = {
        key: event.id,
        userName: event.userName,
        addressIP: event.addressIP,
        operation: event.operation,
        date: date,
        time: time,
      };
      return newData;
    });
    return data;
  },
);

//reset password
export const ResetPasswordData = createAsyncThunk(
  'ResetPasswordData',
  async (DataUpdate: ResetPasswordInterface): Promise<AccountInferface[]> => {
    //update data
    await updateDoc(doc(db, 'accounts', `${DataUpdate.AccountId}`), {
      ...{
        password: DataUpdate.password,
      },
    });
    //get data after update
    const getDatas = await getDocs(accounts);
    const accountsData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = accountsData.map((event: any) => {
      const newData: AccountInferface = {
        key: event.id,
        myFullName: event.myFullName,
        userName: event.userName,
        phoneNumber: event.phoneNumber,
        password: event.password,
        email: event.email,
        role: event.role,
        img: event.img,
        status: event.status,
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
//update data services
export const UpdateDataServices = createAsyncThunk(
  'UpdateDataServices',
  async (DataUpdate: UpdateDataServiceInterface): Promise<ServiceInterface[]> => {
    //update data
    await updateDoc(doc(db, 'services', `${DataUpdate.key}`), {
      ...{
        serviceId: DataUpdate.serviceId,
        serviceName: DataUpdate.serviceName,
        describe: DataUpdate.describe,
        rule: DataUpdate.rule,
      },
    });
    //get data after update
    const getDatas = await getDocs(services);
    const servicesData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = servicesData.map((event: any) => {
      const newData: ServiceInterface = {
        key: event.id,
        serviceId: event.serviceId,
        serviceName: event.event.serviceName,
        online: event.online,
        describe: event.describe,
        rule: event.rule,
      };
      return newData;
    });
    return data;
  },
);
//update data roles
export const UpdateDataRoles = createAsyncThunk(
  'UpdateDataRoles',
  async (DataUpdate: RoleInterface): Promise<RoleInterface[]> => {
    //update data
    await updateDoc(doc(db, 'roles', `${DataUpdate.key}`), {
      ...{
        roleName: DataUpdate.roleName,
        describe: DataUpdate.describe,
        authorization: DataUpdate.authorization,
        authorization2: DataUpdate.authorization2,
      },
    });
    //get data after update
    const getDatas = await getDocs(roles);
    const rolesData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = rolesData.map((event: any) => {
      const newData: RoleInterface = {
        key: event.id,
        roleName: event.roleName,
        describe: event.describe,
        authorization: event.authorization,
        authorization2: event.authorization2,
      };
      return newData;
    });
    return data;
  },
);
//update data roles
export const UpdateDataAccounts = createAsyncThunk(
  'UpdateDataAccounts',
  async (DataUpdate: UpdateDataAccountInferface): Promise<AccountInferface[]> => {
    //update data
    await updateDoc(doc(db, 'accounts', `${DataUpdate.key}`), {
      ...{
        myFullName: DataUpdate.myFullName,
        userName: DataUpdate.userName,
        phoneNumber: DataUpdate.phoneNumber,
        password: DataUpdate.password,
        email: DataUpdate.email,
        role: DataUpdate.role,
        img: DataUpdate.img,
        status: DataUpdate.status,
      },
    });
    //get data after update
    const getDatas = await getDocs(accounts);
    const accountsData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = accountsData.map((event: any) => {
      const newData: AccountInferface = {
        key: event.id,
        myFullName: event.myFullName,
        userName: event.userName,
        phoneNumber: event.phoneNumber,
        password: event.password,
        email: event.email,
        role: event.role,
        img: event.img,
        status: event.status,
      };
      return newData;
    });
    return data;
  },
);

//add data services
export const AddDataServices = createAsyncThunk(
  'AddDataServices',
  async (DataAdd: AddDataServiceInterface): Promise<ServiceInterface[]> => {
    //add data
    await addDoc(collection(db, 'services'), {
      serviceId: DataAdd.serviceId,
      serviceName: DataAdd.serviceName,
      describe: DataAdd.describe,
      rule: DataAdd.rule,
      online: true,
    });
    //get data after add
    const getDatas = await getDocs(services);
    const servicesData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = servicesData.map((event: any) => {
      const newData: ServiceInterface = {
        key: event.id,
        serviceId: event.serviceId,
        serviceName: event.event.serviceName,
        online: event.online,
        describe: event.describe,
        rule: event.rule,
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
//add data distorys
export const AddDataHistory = createAsyncThunk(
  'AddDataHistory',
  async (DataAdd: AddHistoryInterface): Promise<HistoryInterface[]> => {
    //add data
    await addDoc(collection(db, 'historys'), {
      userName: DataAdd.userName,
      dateTime: DataAdd.dateTime,
    });
    //get data after add
    const getDatas = await getDocs(historys);
    const historysData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = historysData.map((event: any) => {
      //covert
      const dateData = event.dateTime.toDate();
      const date = HandleDates(dateData);
      const time = HandleTimes(dateData);
      const newData: HistoryInterface = {
        key: event.id,
        userName: event.userName,
        date: date,
        time: time,
      };
      return newData;
    });
    return data;
  },
);
//add data service detail
export const AddDataServicDetail = createAsyncThunk(
  'AddDataServicDetail',
  async (DataAdd: DataAddServiceDetailInterface): Promise<DataServiceDetailInterface[]> => {
    //add data
    await addDoc(collection(db, 'serviceDetail'), {
      serviceId: DataAdd.serviceId,
      serviceName: DataAdd.serviceName,
      status: 'waiting',
      stt: DataAdd.stt,
      date: DataAdd.date,
      toDate: DataAdd.toDate,
      customerName: DataAdd.customerName,
      email: DataAdd.email,
      phoneNumber: DataAdd.phoneNumber,
      source: DataAdd.source,
    });
    //get data after add
    const getDatas = await getDocs(serviceDetail);
    const servicesDetailData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = servicesDetailData.map((event: any) => {
      //covert
      const dateData = event.date.toDate();
      const toDateData = event.toDate.toDate();
      const date = HandleDates(dateData);
      const time = HandleTimes(dateData);
      const toDate = HandleDates(toDateData);
      const toTime = HandleTimes(toDateData);

      const newData: DataServiceDetailInterface = {
        key: event.id,
        serviceId: event.serviceId,
        status: event.status,
        stt: event.stt,
        date: date,
        serviceName: event.serviceName,
        toDate: toDate,
        customerName: event.customerName,
        email: event.email,
        phoneNumber: event.phoneNumber,
        source: event.source,
        time: time,
        toTime: toTime,
      };
      return newData;
    });
    return data;
  },
);
//add data role
export const AddDataRole = createAsyncThunk(
  'AddDataRole',
  async (DataAdd: AddRoleInterface): Promise<RoleInterface[]> => {
    //add data
    await addDoc(collection(db, 'roles'), {
      roleName: DataAdd.roleName,
      describe: DataAdd.describe,
      authorization: DataAdd.authorization,
      authorization2: DataAdd.authorization2,
    });
    //get data after add
    const getDatas = await getDocs(roles);
    const rolesData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = rolesData.map((event: any) => {
      const newData: RoleInterface = {
        key: event.id,
        roleName: event.roleName,
        describe: event.describe,
        authorization: event.authorization,
        authorization2: event.authorization2,
      };
      return newData;
    });
    return data;
  },
);
//add data account
export const AddDataAccount = createAsyncThunk(
  'AddDataAccount',
  async (DataAdd: AddDataAccountInferface): Promise<AccountInferface[]> => {
    //add data
    await addDoc(collection(db, 'accounts'), {
      myFullName: DataAdd.myFullName,
      userName: DataAdd.userName,
      phoneNumber: DataAdd.phoneNumber,
      password: DataAdd.password,
      email: DataAdd.email,
      role: DataAdd.role,
      img: DataAdd.img,
      status: DataAdd.status,
    });
    //get data after add
    const getDatas = await getDocs(accounts);
    const accountsData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = accountsData.map((event: any) => {
      const newData: AccountInferface = {
        key: event.id,
        myFullName: event.myFullName,
        userName: event.userName,
        phoneNumber: event.phoneNumber,
        password: event.password,
        email: event.email,
        role: event.role,
        img: event.img,
        status: event.status,
      };
      return newData;
    });
    return data;
  },
);
//add data user history
export const AddDataUserHistory = createAsyncThunk(
  'AddDataUserHistory',
  async (DataAdd: AddUserHistoryInterface): Promise<UserHistoryInterface[]> => {
    //add data
    await addDoc(collection(db, 'userHistory'), {
      userName: DataAdd.userName,
      addressIP: DataAdd.addressIP,
      operation: DataAdd.operation,
      dateTime: DataAdd.dateTime,
    });
    //get data after add
    const getDatas = await getDocs(userHistory);
    const userHistoryData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = userHistoryData.map((event: any) => {
      //covert
      const dateData = event.dateTime.toDate();
      const date = HandleDates(dateData);
      const time = HandleTimes(dateData);
      const newData: UserHistoryInterface = {
        key: event.id,
        userName: event.userName,
        addressIP: event.addressIP,
        operation: event.operation,
        date: date,
        time: time,
      };
      return newData;
    });
    return data;
  },
);

interface AccountState {
  Account: AccountInferface[];
}
interface DeviceState {
  Device: DeviceInterface[];
}
interface ServiceState {
  Service: ServiceInterface[];
}
interface ServiceDetailState {
  ServiceDetail: DataServiceDetailInterface[];
}
interface HistoryState {
  History: HistoryInterface[];
}
interface RoleState {
  Role: RoleInterface[];
}
interface UserHistoryState {
  UserHistory: UserHistoryInterface[];
}
const initialAccountState: AccountState = {
  Account: [],
};
const initialDeviceState: DeviceState = {
  Device: [],
};
const initialServiceState: ServiceState = {
  Service: [],
};
const initialServiceDetailState: ServiceDetailState = {
  ServiceDetail: [],
};
const initialHistoryState: HistoryState = {
  History: [],
};
const initialRoleState: RoleState = {
  Role: [],
};
const initialUserHistoryState: UserHistoryState = {
  UserHistory: [],
};
export const AccountSlice = createSlice({
  name: 'Account',
  initialState: initialAccountState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(AccountLogin.fulfilled, (state, action) => {
        state.Account = action.payload;
      })
      .addCase(ResetPasswordData.fulfilled, (state, action) => {
        state.Account = action.payload;
      });
  },
});
export const DeviceSlice = createSlice({
  name: 'Device',
  initialState: initialDeviceState,
  reducers: {},
  extraReducers: builder => {
    builder
      //device
      .addCase(GetDataDevices.fulfilled, (state, action) => {
        state.Device = action.payload;
      })
      .addCase(UpdateDataDevices.fulfilled, (state, action) => {
        state.Device = action.payload;
      })
      .addCase(AddDataDevices.fulfilled, (state, action) => {
        state.Device = action.payload;
      });
  },
});
export const ServiceSlice = createSlice({
  name: 'Service',
  initialState: initialServiceState,
  reducers: {},
  extraReducers: builder => {
    builder
      //service
      .addCase(GetDataServices.fulfilled, (state, action) => {
        state.Service = action.payload;
      })
      .addCase(UpdateDataServices.fulfilled, (state, action) => {
        state.Service = action.payload;
      })
      .addCase(AddDataServices.fulfilled, (state, action) => {
        state.Service = action.payload;
      });
  },
});
export const ServiceDetailSlice = createSlice({
  name: 'ServiceDetail',
  initialState: initialServiceDetailState,
  reducers: {},
  extraReducers: builder => {
    builder
      //service detail
      .addCase(GetDataServicDetail.fulfilled, (state, action) => {
        state.ServiceDetail = action.payload;
      })
      .addCase(AddDataServicDetail.fulfilled, (state, action) => {
        state.ServiceDetail = action.payload;
      });
  },
});
export const HistorySlice = createSlice({
  name: 'History',
  initialState: initialHistoryState,
  reducers: {},
  extraReducers: builder => {
    builder
      //history
      .addCase(GetDataHistorys.fulfilled, (state, action) => {
        state.History = action.payload;
      })
      .addCase(AddDataHistory.fulfilled, (state, action) => {
        state.History = action.payload;
      });
  },
});
export const RoleSlice = createSlice({
  name: 'Role',
  initialState: initialRoleState,
  reducers: {},
  extraReducers: builder => {
    builder
      //role
      .addCase(GetDataRoles.fulfilled, (state, action) => {
        state.Role = action.payload;
      })
      .addCase(UpdateDataRoles.fulfilled, (state, action) => {
        state.Role = action.payload;
      })
      .addCase(AddDataRole.fulfilled, (state, action) => {
        state.Role = action.payload;
      });
  },
});
export const UserHistorySlice = createSlice({
  name: 'UserHistory',
  initialState: initialUserHistoryState,
  reducers: {},
  extraReducers: builder => {
    builder
      //role
      .addCase(GetDataUserHistorys.fulfilled, (state, action) => {
        state.UserHistory = action.payload;
      })
      .addCase(AddDataUserHistory.fulfilled, (state, action) => {
        state.UserHistory = action.payload;
      });
  },
});

// const rootReducer = combineReducers({
//   Account: AccountSlice.reducer,
//   Device: DeviceSlice.reducer,
//   Service: ServiceSlice.reducer,
//   ServiceDetail: ServiceDetailSlice.reducer,
//   History: HistorySlice.reducer,
// });

// export default rootReducer;
