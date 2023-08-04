import { AccountInferface, DataServiceDetailInterface } from '../@types';

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
export const HandleDateIncrease = (dateTimes: Date): string => {
  const day: string = (dateTimes.getDate() + 1).toString();
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
export const HandleTimes = (dateTimes: Date): string => {
  const hrs: string = dateTimes.getHours().toString();
  const mm: string = dateTimes.getMinutes().toString();
  const sc: string = dateTimes.getSeconds().toString();

  if (hrs.length < 2) {
    if (mm.length < 2) {
      if (sc.length < 2) {
        return `0${hrs}:0${mm}:0${sc}`;
      }
      return `0${hrs}:0${mm}:${sc}`;
    }
    return `0${hrs}:${mm}:${sc}`;
  } else if (mm.length < 2) {
    if (sc.length < 2) {
      return `${hrs}:0${mm}:0${sc}`;
    }
    return `${hrs}:0${mm}:${sc}`;
  } else if (sc.length < 2) {
    return `${hrs}:${mm}:0${sc}`;
  }
  return `${hrs}:${mm}:${sc}`;
};
export const ConvertToTimestamp = (date: string, time: string) => {
  const str = `${date} ${time}`;

  const [dateComponents, timeComponents] = str.split(' ');

  const [day, month, year] = dateComponents.split('/');
  const setMonth: number = +month;
  const [hours, minutes, seconds] = timeComponents.split(':');

  const newDate = new Date(+year, setMonth - 1, +day, +hours, +minutes, +seconds);

  const timestamp = newDate.getTime();
  return newDate;
};
export const NewNumber = (data: DataServiceDetailInterface[], serviceId: string) => {
  if (data.length > 0) {
    const listSort = [...data].sort((a, b) => (a.stt > b.stt ? 1 : -1));
    const lastIndex = listSort[listSort.length - 1];
    const capSo = lastIndex.stt;
    const capSoToNumber: number = Number(capSo) as number;
    const newCapSo: string = String(capSoToNumber + 1) as string;
    return newCapSo;
  } else {
    const newCapSo = serviceId + '0001';
    return newCapSo;
  }
};
