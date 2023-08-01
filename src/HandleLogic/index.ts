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
export const HandleDates = (dateTimes: Date): string => {
  const day: string = dateTimes.getDate().toString();
  const month: string = (dateTimes.getMonth() + 1).toString();
  const year = dateTimes.getFullYear();

  if (day.length < 2) {
    if (month.length < 2) {
      return `0${day}/0${month}/${year}`;
    }
    return `0${day}/${month}/${year}`;
  } else if (month.length < 2) {
    return `${day}/0${month}/${year}`;
  } else {
    return `${day}/${month}/${year}`;
  }
};
