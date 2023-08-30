import { ColumnType } from 'antd/es/table';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import dayjs from 'dayjs';
export interface InputTypeInterface {
  width: number;
  height: number;
  placeholder: string;
  border: string;
  HandleChangeInput(event: React.ChangeEvent<HTMLInputElement>): void;
}
export interface ButtonTypeInterface {
  HandleChangeButton(): void;
}
export interface AccountInferface {
  key: string;
  myFullName: string;
  userName: string;
  phoneNumber: string;
  password: string;
  email: string;
  role: string;
  img: string;
  status: boolean;
}
export interface AddDataAccountInferface {
  myFullName: string;
  userName: string;
  phoneNumber: string;
  password: string;
  email: string;
  role: string;
  img?: string;
  status: boolean;
}
export interface UpdateDataAccountInferface {
  key: string;
  myFullName: string;
  userName: string;
  phoneNumber: string;
  password: string;
  email: string;
  role: string;
  img?: string;
  status: boolean;
}
export interface AccountLoginInterface {
  userName: string;
  password: string;
}
export interface ForgetPasswordType {
  activeBorder: boolean;
  message: string;
  HandleClickContinue: (emailInput: string) => void;
}
export interface ResetPasswordType {
  AccountId: string;
}
export interface ResetPasswordInterface {
  AccountId: string;
  password: string;
}

export interface BDCapSoType {
  icons: number;
  activeColor: string;
  text: string;
  percent: number;
  percentStatus: boolean;
  data: number;
}
export interface TextNavbarType {
  text: string;
}
export interface CustomSelectType {
  width: number;
  height: number;
  data: string[];
  HandleChooseSelect: (select: string) => void;
}
//rooms------------------------------------------
export interface RoomsInterface {
  key: string;
  roomID: string;
  status: boolean;
  doctor: string[];
  service: string[];
}
//add
export interface AddRoomsInterface {
  roomID: string;
  status: boolean;
  doctor: string[];
  service: string[];
}
//Type DS phong khám
export interface ListRoomInterface {
  HandleClickAddRoom: () => void;
  HandleClickDescription: (key: string) => void;
  HandleClickUpdate: (key: string) => void;
}
export interface AddDeviceInterface {
  HandleClickCancelAddDevice: () => void;
  HandleClickOkAddDevice: (
    deviceId: string,
    deviceType: string,
    deviceName: string,
    userName: string,
    addressIP: string,
    password: string,
    userDevice: string,
  ) => void;
}
//type chi tiet phong kham
export interface DescriptionRoomInterface {
  id: string;
  HandleClickUpdateRoom: (key: string) => void;
  HandleClickGoBackRoom: () => void;
}
//type cap nhap phong kham
export interface UpdateDeviceInterface {
  id: string;
  HandleClickCancelUpdateDevice: () => void;
  HandleClickOkUpdateDevice: (
    deviceId: string,
    deviceType: string,
    deviceName: string,
    userName: string,
    addressIP: string,
    password: string,
    userDevice: string,
    listUserDevice: string[],
  ) => void;
  // HandleClickUpdateDevice: (key: string) => void;
}
//doctors------------------------------------------
export interface DoctorsInterface {
  key: string;
  doctorID: string;
  professional: string[];
  status: boolean;
  fullName: string;
  birthday: string;
  dateWork: string;
  phoneNumber: string;
  address: string;
}
//add
export interface AddDoctorsInterface {
  doctorID: string;
  professional: string[];
  status: boolean;
  fullName: string;
  birthday: string;
  dateWork: string;
  phoneNumber: string;
  address: string;
}
//BHYT
export interface BHYTInterface {
  key: string;
  BHYTID: string;
  fullName: string;
  address: string;
  birthday: string;
  endDate: string;
  phoneNumber: string;
  profession: string;
  startDate: string;
  status: boolean;
}
//add BHYT
export interface AddBHYTInterface {
  BHYTID: string;
  fullName: string;
  address: string;
  birthday: string;
  endDate: string;
  phoneNumber: string;
  profession: string;
  startDate: string;
  status: boolean;
}

//services
export interface ServiceInterface {
  key: string;
  serviceId: string;
  serviceName: string;
  status: boolean;
  price: string;
  rooms: string[];
  rule: string[];
}
export interface ListServiceInterface {
  HandleClickAddService: () => void;
  HandleClickDescriptionService: (id: string) => void;
  HandleClickUpdateService: (id: string) => void;
}
export interface AddServiceInterface {
  HandleClickCancelAddService: () => void;
  HandleClickOkAddService: (
    serviceId: string,
    serviceName: string,
    describe: string,
    rule: string[],
  ) => void;
}
export interface DetailServiceInterface {
  HandleClickUpdate: () => void;
  HandleClickGoBack: () => void;
  id: string;
}
//update service
export interface UpdateServiceInterface {
  HandleClickCancelUpdateService: () => void;
  HandleClickOkUpdateService: (
    serviceId: string,
    serviceName: string,
    describe: string,
    rule: string[],
  ) => void;
  id: string;
}
//////////////////My profile & bell
export interface MyProfileInterface {
  HandleClickMyProfile: () => void;
  HandleClickBell: () => void;
  myFullName: string | undefined;
}
//data update service
export interface UpdateDataServiceInterface {
  key: string;
  serviceId: string;
  serviceName: string;
  describe: string;
  rule: string[];
}
//data add service
export interface AddDataServiceInterface {
  serviceId: string;
  serviceName: string;
  describe: string;
  rule: string[];
  online?: boolean;
}
//cap so
export interface CapSoInterface {
  key: string;
  BHYTID: string;
  capsoID: string;
  endDate: string;
  fullName: string;
  phoneNumber: string;
  price: string;
  serviceID: string;
  startDate: string;
  status: string;
}
export interface AddCapSoInterface {
  BHYTID: string;
  capsoID: string;
  endDate: Date;
  fullName: string;
  phoneNumber: string;
  price: string;
  serviceID: string;
  startDate: Date;
  status: string;
}
export interface ModalAddCapSoInterface {
  HandleClickAddCapSo: () => void;
  HandleClickChiTietCapSo: (id: string) => void;
}
export interface AddDataCapSoInterface {
  HandleClickAddCapSo: (
    capso: string,
    dateTimeNow: Date,
    serviceId: string,
    serviceName: string,
  ) => void;
  HandleClickCancelCapSo: () => void;
}
export interface AddProfileCustomerInterface {
  HandleClickContinue: (customerName: string, email: string, phoneNumber: string) => void;
  HandleClickCancel: () => void;
  customerName: string;
  email: string;
  phoneNumber: string;
}
//history
export interface HistoryInterface {
  key: string;
  userName: string;
  date: string;
  time: string;
}
export interface AddHistoryInterface {
  userName: string;
  dateTime: Date;
}
//modal in so
export interface ModalInSoInterface {
  open: boolean;
  HandleClickCacel: () => void;
  stt: string;
  dateTime: Date | undefined;
  toDateTime: Date | undefined;
  servicerName: string;
  couter: string;
}
export interface DetailCapSoInterface {
  id: string;
  HandleClickGoBack: () => void;
}

///role
export interface RoleInterface {
  key: string;
  roleName: string;
  describe: string;
  authorization: string[];
  authorization2: string[];
}
export interface AddRoleInterface {
  roleName: string;
  describe: string;
  authorization: string[];
  authorization2: string[];
}
export interface DSVaiTroInterface {
  HandleClickAddRole: () => void;
  HandleClickUpdateRole: (id: string) => void;
}
export interface AddModalRoleInterface {
  HandleClickOkAddRole: (
    roleName: string,
    describe: string,
    authorization: string[],
    authorization2: string[],
  ) => void;
  HandleClickCancelAddRole: () => void;
}
export interface UpdateModalRoleInterface {
  HandleClickOkUpdateRole: (
    roleName: string,
    describe: string,
    authorization: string[],
    authorization2: string[],
  ) => void;
  HandleClickCancelUpdateRole: () => void;
  id: string;
}
//account
export interface DSTaiKhoanInterface {
  HandleClickAddAccount: () => void;
  HandleClickUpdateAccount: (id: string) => void;
}
export interface AddTaiKhoanInterface {
  HandleClickCancelAddAccount: () => void;
  HandleClickOkAddAccount: (
    myFullName: string,
    userName: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
    email: string,
    role: string,
    status: string,
  ) => void;
}
export interface UpdateTaiKhoanInterface {
  HandleClickCancelUpdateAccount: () => void;
  HandleClickOkUpdateAccount: (
    myFullName: string,
    userName: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
    email: string,
    role: string,
    status: string,
  ) => void;
  id: string;
}
//history users
export interface UserHistoryInterface {
  key: string;
  userName: string;
  addressIP: string;
  operation: string;
  date: string;
  time: string;
}
export interface AddUserHistoryInterface {
  userName: string;
  addressIP: string;
  operation: string;
  dateTime: Date;
}
///bell
export interface BellInterface {
  open: boolean;
  HandleClickCancel: () => void;
}
export interface ModalFilterInterface {
  open: boolean;
  title: string;
  data: string[];
  text: string;
  HandleClickCancel: () => void;
  HandleClickSetValue: (event: string) => void;
}
export interface ModalCheckedInterface {
  open: boolean;
  title: string;
  data: string[];
  text: string[];
  HandleClickCancel: () => void;
  HandleClickSetValue: (event: CheckboxValueType[]) => void;
}
export interface ChartInterface {
  select: string;
}
export interface CustomDoughutInterface {
  percent: number;
  colorOne: string;
  colorTwo: string;
}
export interface CustomDoughutThreeInterface {
  percent: number;
  percentTwo: number;
  colorOne: string;
  colorTwo: string;
  colorThree: string;
}
export interface DatePicketInterface {
  HandleClickDate: (value: dayjs.Dayjs) => void;
  setDate: string;
}
//doughnut
export interface DoughtnutInterface {
  colorOne: string;
  colorTwo: string;
  percent: number;
  icons: string;
  textTitle: string;
  textOne: string;
  textTwo: string;
  quantityTrue: number;
  quantityFalse: number;
}
