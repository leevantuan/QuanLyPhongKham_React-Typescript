import { ColumnType } from 'antd/es/table';

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
  id: string;
  myFullName: string;
  userName: string;
  phoneNumber: number;
  password: string;
  email: string;
  role: string;
  img: string;
  state: boolean;
}
export interface ListAccountInterface {
  Account: AccountInferface[];
  Device: DeviceInterface[];
  Service: ServiceInterface[];
  ServiceDetail: DataServiceDetailInterface[];
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
export interface BDCapSoType {
  icons: number;
  activeColor: string;
  text: string;
  percent: number;
  percentStatus: boolean;
  data: number;
}
export interface TextNavbarType {
  textLv1: string;
  textLv2: string;
  textLv3: string;
}
export interface CustomSelectType {
  width: number;
  height: number;
  data: string[];
  HandleChooseSelect: (select: string) => void;
}
//Device
export interface DeviceInterface {
  key: string;
  addressIP: string;
  connect?: boolean;
  deviceId: string;
  deviceName: string;
  deviceType: string;
  online?: boolean;
  password: string;
  userName: string;
  userService: string;
}
//add
export interface AddDeviceModalInterface {
  addressIP: string;
  deviceId: string;
  deviceName: string;
  deviceType: string;
  password: string;
  userName: string;
  userService: string;
}

//data table
// export interface DataTableInterface {
//   columns: ColumnType<DeviceInterface | ServiceInterface>;
//   data: DeviceInterface[];
// }

//Type DS thiet bi
export interface ListDeviceInterface {
  HandleClickAddDevice: () => void;
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
//type chi tiet thiet bi
export interface DescriptionDeviceInterface {
  id: string;
  HandleClickUpdateDevice: (key: string) => void;
  HandleClickGoBackDevice: () => void;
}
//type cap nhap thiet bi
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
//services
export interface ServiceInterface {
  key: string;
  serviceId: string;
  serviceName: string;
  online?: boolean;
  describe: string;
  rule: string[];
}
export interface ListServiceInterface {
  HandleClickAddService: () => void;
  HandleClickDescriptionService: (id: string) => void;
  HandleClickUpdateService: (id: string) => void;
}
export interface AddServiceInterface {
  HandleClickCancelAddService: () => void;
  HandleClickOkAddService: () => void;
}
export interface DetailServiceInterface {
  HandleClickUpdate: () => void;
  HandleClickGoBack: () => void;
  id: string;
}
//service detail
export interface DataServiceDetailInterface {
  key: string;
  serviceId: string;
  status: string;
  stt: string;
  date: string;
}
//update service
export interface UpdateServiceInterface {
  HandleClickCancelUpdateService: () => void;
  HandleClickOkUpdateService: () => void;
  id: string;
}
