export interface AccountInferface {
  key: string;
  fullName: string;
  email: string;
  img: string;
  phoneNumber: string;
  userName: string;
  password: string;
  status: boolean;
  roleId: string;
}
export interface LoginInterface {
  email: string;
  password: string;
}

export interface UserInterface {
  email: string;
  fullname: string;
}
