import { AccountInferface, RoleInterface } from '../../@types';

export const isLogin = () => {
  const token = localStorage.getItem('tokenUser');
  if (token) {
    return token;
  } else {
    return null;
  }
};
export const isAuthorization1 = (
  auth: string,
  data: AccountInferface,
  dataAuth: RoleInterface[],
) => {
  const role = data.role;
  const checkRole = dataAuth.find(event => event.roleName === role);
  if (checkRole) {
    const AuthList = checkRole.authorization;
    const checkAuth = AuthList.find(event => event === auth || event === '0');
    if (checkAuth) {
      return true;
    } else {
      return false;
    }
  }
};
export const isAuthorization2 = (
  auth: string,
  data: AccountInferface,
  dataAuth: RoleInterface[],
) => {
  const role = data.role;
  const checkRole = dataAuth.find(event => event.roleName === role);
  if (checkRole) {
    const AuthList = checkRole.authorization2;
    const checkAuth = AuthList.find(event => event === auth || event === '0');
    if (checkAuth) {
      return true;
    } else {
      return false;
    }
  }
};
