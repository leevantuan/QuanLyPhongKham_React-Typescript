import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { db } from '../../data';
import {
  AccountInferface,
  AddDataAccountInferface,
  AddDataServiceInterface,
  AddRoomsInterface,
  AddRoleInterface,
  CapSoInterface,
  RoomsInterface,
  ResetPasswordInterface,
  RoleInterface,
  ServiceInterface,
  UpdateDataAccountInferface,
  UpdateDataServiceInterface,
  DoctorsInterface,
  BHYTInterface,
  AddBHYTInterface,
  AddCapSoInterface,
} from '../../@types';
import { HandleDates } from '../../HandleLogic';

export const accounts = query(collection(db, 'accounts'));
export const services = query(collection(db, 'services'));
export const capso = query(collection(db, 'capso'));
export const roles = query(collection(db, 'roles'));
export const rooms = query(collection(db, 'rooms'));
export const doctors = query(collection(db, 'doctors'));
export const BHYT = query(collection(db, 'BHYT'));

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
//get data rooms
export const GetDataRooms = createAsyncThunk(
  'GetDataRooms',
  async (): Promise<RoomsInterface[]> => {
    const getDatas = await getDocs(rooms);
    const accountsData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = accountsData.map((event: any) => {
      const newData: RoomsInterface = {
        key: event.id,
        roomID: event.roomID,
        status: event.status,
        doctor: event.doctor,
        service: event.service,
      };
      return newData;
    });
    return data;
  },
);
//get data doctors
export const GetDataDoctors = createAsyncThunk(
  'GetDataDoctors',
  async (): Promise<DoctorsInterface[]> => {
    const getDatas = await getDocs(doctors);
    const Data = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = Data.map((event: any) => {
      const newData: DoctorsInterface = {
        key: event.id,
        doctorID: event.doctorID,
        professional: event.professional,
        status: event.status,
        fullName: event.fullName,
        birthday: event.birthday,
        dateWork: event.dateWork,
        phoneNumber: event.phoneNumber,
        address: event.address,
      };
      return newData;
    });
    return data;
  },
);
//get data BHYT
export const GetDataBHYT = createAsyncThunk('GetDataBHYT', async (): Promise<BHYTInterface[]> => {
  const getDatas = await getDocs(BHYT);
  const Data = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

  const data = Data.map((event: any) => {
    const newData: BHYTInterface = {
      key: event.id,
      BHYTID: event.BHYTID,
      fullName: event.fullName,
      address: event.address,
      birthday: event.birthday,
      endDate: event.endDate,
      phoneNumber: event.phoneNumber,
      profession: event.profession,
      startDate: event.startDate,
      status: event.status,
    };
    return newData;
  });
  return data;
});
//get data cap so
export const GetDataCapSo = createAsyncThunk(
  'GetDataCapSo',
  async (): Promise<CapSoInterface[]> => {
    const getDatas = await getDocs(capso);
    const Data = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = Data.map((event: any) => {
      //covert
      const startDate = event.startDate.toDate();
      const endDate = event.endDate.toDate();
      const date = HandleDates(startDate);
      const toDate = HandleDates(endDate);

      const newData: CapSoInterface = {
        key: event.id,
        BHYTID: event.BHYTID,
        capsoID: event.capsoID,
        endDate: toDate,
        fullName: event.fullName,
        phoneNumber: event.phoneNumber,
        price: event.price,
        serviceID: event.serviceID,
        startDate: date,
        status: event.status,
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
        status: event.status,
        price: event.price,
        rooms: event.rooms,
        rule: event.rule,
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

//update data rooms
export const UpdateDataRooms = createAsyncThunk(
  'UpdateDataRooms',
  async (DataUpdate: RoomsInterface): Promise<RoomsInterface[]> => {
    //update data
    await updateDoc(doc(db, 'rooms', `${DataUpdate.key}`), {
      ...{
        roomID: DataUpdate.roomID,
        status: DataUpdate.status,
        doctor: DataUpdate.doctor,
        service: DataUpdate.service,
      },
    });
    //get data after update
    const getDatas = await getDocs(rooms);
    const accountsData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = accountsData.map((event: any) => {
      const newData: RoomsInterface = {
        key: event.id,
        roomID: event.roomID,
        status: event.status,
        doctor: event.doctor,
        service: event.service,
      };
      return newData;
    });
    return data;
  },
);
//update data BHYT
export const UpdateDataBHYT = createAsyncThunk(
  'UpdateDataBHYT',
  async (DataUpdate: BHYTInterface): Promise<BHYTInterface[]> => {
    //update data
    await updateDoc(doc(db, 'BHYT', `${DataUpdate.key}`), {
      ...{
        BHYTID: DataUpdate.BHYTID,
        address: DataUpdate.address,
        fullName: DataUpdate.fullName,
        birthday: DataUpdate.birthday,
        endDate: DataUpdate.endDate,
        phoneNumber: DataUpdate.phoneNumber,
        profession: DataUpdate.profession,
        startDate: DataUpdate.startDate,
        status: DataUpdate.status,
      },
    });
    //get data after update
    const getDatas = await getDocs(BHYT);
    const Data = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = Data.map((event: any) => {
      const newData: BHYTInterface = {
        key: event.id,
        BHYTID: event.BHYTID,
        fullName: event.fullName,
        address: event.address,
        birthday: event.birthday,
        endDate: event.endDate,
        phoneNumber: event.phoneNumber,
        profession: event.profession,
        startDate: event.startDate,
        status: event.status,
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
        serviceName: event.serviceName,
        status: event.status,
        price: event.price,
        rooms: event.rooms,
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
        serviceName: event.serviceName,
        status: event.status,
        price: event.price,
        rooms: event.rooms,
        rule: event.rule,
      };
      return newData;
    });
    return data;
  },
);
//add data rooms
export const AddDataRooms = createAsyncThunk(
  'AddDataRooms',
  async (DataAdd: AddRoomsInterface): Promise<RoomsInterface[]> => {
    //add data
    await addDoc(collection(db, 'rooms'), {
      roomID: DataAdd.roomID,
      status: DataAdd.status,
      doctor: DataAdd.doctor,
      service: DataAdd.service,
    });
    //get data after add
    const getDatas = await getDocs(rooms);
    const accountsData = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = accountsData.map((event: any) => {
      const newData: RoomsInterface = {
        key: event.id,
        roomID: event.roomID,
        status: event.status,
        doctor: event.doctor,
        service: event.service,
      };
      return newData;
    });
    return data;
  },
);
//add data BHYT
export const AddDataBHYT = createAsyncThunk(
  'AddDataBHYT',
  async (DataAdd: AddBHYTInterface): Promise<BHYTInterface[]> => {
    //add data
    await addDoc(collection(db, 'BHYT'), {
      BHYTID: DataAdd.BHYTID,
      address: DataAdd.address,
      fullName: DataAdd.fullName,
      birthday: DataAdd.birthday,
      endDate: DataAdd.endDate,
      phoneNumber: DataAdd.phoneNumber,
      profession: DataAdd.profession,
      startDate: DataAdd.startDate,
      status: DataAdd.status,
    });
    //get data after add
    const getDatas = await getDocs(BHYT);
    const Data = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = Data.map((event: any) => {
      const newData: BHYTInterface = {
        key: event.id,
        BHYTID: event.BHYTID,
        fullName: event.fullName,
        address: event.address,
        birthday: event.birthday,
        endDate: event.endDate,
        phoneNumber: event.phoneNumber,
        profession: event.profession,
        startDate: event.startDate,
        status: event.status,
      };
      return newData;
    });
    return data;
  },
);
//add data service detail
export const AddDataCapSo = createAsyncThunk(
  'AddDataCapSo',
  async (DataAdd: AddCapSoInterface): Promise<CapSoInterface[]> => {
    //add data
    await addDoc(collection(db, 'capso'), {
      BHYTID: DataAdd.BHYTID,
      capsoID: DataAdd.capsoID,
      endDate: DataAdd.endDate,
      fullName: DataAdd.fullName,
      phoneNumber: DataAdd.phoneNumber,
      price: DataAdd.price,
      serviceID: DataAdd.serviceID,
      startDate: DataAdd.startDate,
      status: DataAdd.status,
    });
    //get data after add
    const getDatas = await getDocs(capso);
    const Data = getDatas.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));

    const data = Data.map((event: any) => {
      //covert
      const startDate = event.startDate.toDate();
      const endDate = event.endDate.toDate();
      const date = HandleDates(startDate);
      const toDate = HandleDates(endDate);

      const newData: CapSoInterface = {
        key: event.id,
        BHYTID: event.BHYTID,
        capsoID: event.capsoID,
        endDate: toDate,
        fullName: event.fullName,
        phoneNumber: event.phoneNumber,
        price: event.price,
        serviceID: event.serviceID,
        startDate: date,
        status: event.status,
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

interface AccountState {
  Account: AccountInferface[];
}
interface RoomState {
  Room: RoomsInterface[];
}
interface DoctorState {
  Doctor: DoctorsInterface[];
}
interface BHYTState {
  BHYT: BHYTInterface[];
}
interface ServiceState {
  Service: ServiceInterface[];
}
interface CapSoState {
  CapSo: CapSoInterface[];
}
interface RoleState {
  Role: RoleInterface[];
}
const initialAccountState: AccountState = {
  Account: [],
};
const initialRoomState: RoomState = {
  Room: [],
};
const initialDoctorState: DoctorState = {
  Doctor: [],
};
const initialBHYTState: BHYTState = {
  BHYT: [],
};
const initialServiceState: ServiceState = {
  Service: [],
};
const initialCapSoState: CapSoState = {
  CapSo: [],
};
const initialRoleState: RoleState = {
  Role: [],
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
export const RoomSlice = createSlice({
  name: 'Rooms',
  initialState: initialRoomState,
  reducers: {},
  extraReducers: builder => {
    builder
      //device
      .addCase(GetDataRooms.fulfilled, (state, action) => {
        state.Room = action.payload;
      })
      .addCase(UpdateDataRooms.fulfilled, (state, action) => {
        state.Room = action.payload;
      })
      .addCase(AddDataRooms.fulfilled, (state, action) => {
        state.Room = action.payload;
      });
  },
});
export const DoctorSlice = createSlice({
  name: 'Doctors',
  initialState: initialDoctorState,
  reducers: {},
  extraReducers: builder => {
    builder
      //device
      .addCase(GetDataDoctors.fulfilled, (state, action) => {
        state.Doctor = action.payload;
      });
    // .addCase(UpdateDataRooms.fulfilled, (state, action) => {
    //   state.Room = action.payload;
    // })
    // .addCase(AddDataRooms.fulfilled, (state, action) => {
    //   state.Room = action.payload;
    // });
  },
});
export const BHYTSlice = createSlice({
  name: 'BHYT',
  initialState: initialBHYTState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetDataBHYT.fulfilled, (state, action) => {
        state.BHYT = action.payload;
      })
      .addCase(UpdateDataBHYT.fulfilled, (state, action) => {
        state.BHYT = action.payload;
      })
      .addCase(AddDataBHYT.fulfilled, (state, action) => {
        state.BHYT = action.payload;
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
export const CapSoSlice = createSlice({
  name: 'CapSo',
  initialState: initialCapSoState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetDataCapSo.fulfilled, (state, action) => {
      state.CapSo = action.payload;
    });
    // .addCase(AddDataCapSo.fulfilled, (state, action) => {
    //   state.CapSo = action.payload;
    // });
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

// const rootReducer = combineReducers({
//   Account: AccountSlice.reducer,
//   Device: DeviceSlice.reducer,
//   Service: ServiceSlice.reducer,
//   ServiceDetail: ServiceDetailSlice.reducer,
//   History: HistorySlice.reducer,
// });

// export default rootReducer;
