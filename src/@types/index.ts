import { ColumnsType } from 'antd/es/table';

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
}
//Device
export interface DeviceInterface {
  key: string;
  addressIP: string;
  connect: boolean;
  deviceId: string;
  deviceName: string;
  deviceType: string;
  online: boolean;
  password: string;
  userName: string;
  userService: string;
}

//data table
export interface DataTableInterface {
  columns: ColumnsType<DeviceInterface>;
  data: DeviceInterface[];
}

//Type DS thiet bi
export interface ListDeviceInterface {
  HandleClickAddDevice: () => void;
  HandleClickDescription: (key: string) => void;
  HandleClickUpdate: (key: string) => void;
}
export interface CancelAddDeviceInterface {
  HandleClickCancelAddDevice: () => void;
  HandleClickOkAddDevice: () => void;
}
//type chi tiet thiet bi
export interface DescriptionDeviceInterface {
  id: string;
  HandleClickUpdateDevice: (key: string) => void;
}
//type cap nhap thiet bi
export interface UpdateDeviceInterface {
  id: string;
  // HandleClickUpdateDevice: (key: string) => void;
}
