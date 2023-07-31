import { AccountInferface } from '../@types';

export const HandleCheckLogin = (userName: string, password: string, data: AccountInferface[]) => {
  const checkUser = data.find(data => data.userName === userName);
  if (checkUser) {
    const checkPassword = checkUser.password === password;
    if (checkPassword === true) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
