import { AccountInferface, DataServiceDetailInterface } from '../@types';
import dayjs from 'dayjs';

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
export const SoSanhMonth = (date: string, dateNow: string) => {
  const setDate = date.split('/');
  const setDateNow = dateNow.split('/');

  const setMonth = setDate[1];
  const setYear = setDate[2];
  const setMonthNow = setDateNow[1];
  const setYearNow = setDateNow[2];

  const month: number = +setMonth;
  const year: number = +setYear;
  const monthNow: number = +setMonthNow;
  const yearNow: number = +setYearNow;

  if (year === yearNow && month === monthNow) {
    return true;
  } else {
    return false;
  }
};
export const SoSanhDate = (date: string, dateNow: string) => {
  const [setDay, setMonth, setYear] = date.split('/');
  const [setDayNow, setMonthNow, setYearNow] = dateNow.split('/');
  const day: number = +setDay;
  const month: number = +setMonth;
  const year: number = +setYear;
  const dayNow: number = +setDayNow;
  const monthNow: number = +setMonthNow;
  const yearNow: number = +setYearNow;

  if (year > yearNow) {
    return true;
  } else if (year === yearNow) {
    if (month > monthNow) {
      return true;
    } else if (month === monthNow) {
      if (day > dayNow) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};
export const getWeek = (day: string, monthWeek: number, monthYear: number) => {
  const weekFormat = 'DD/MM';
  const date = `${day}/${monthWeek}/${monthYear}`;
  const dateTimestamp = ConvertToTimestamp(date, '00:00:00');
  const DayWeek = `${dayjs(dateTimestamp).startOf('week').format(weekFormat)} ~ ${dayjs(
    dateTimestamp,
  )
    .endOf('week')
    .format(weekFormat)}`;
  return DayWeek;
};
export const HandleListWeek = (dateString: string) => {
  const monthTimestamp = ConvertToTimestamp(`01/${dateString}`, '00:00:00');
  const monthWeek: number = monthTimestamp.getMonth() + 1;
  const monthYear: number = monthTimestamp.getFullYear();

  const TH0: string[] = ['1', '8', '15', '22'];
  const TH1: string[] = ['1', '8', '15', '22', '29'];
  const TH2: string[] = ['1', '8', '15', '22', '29', '30'];
  const TH3: string[] = ['1', '8', '15', '22', '29', '31'];

  const ThuTrongTuan = monthTimestamp.getDay();

  switch (monthWeek) {
    case 4:
    case 6:
    case 9:
    case 11: {
      if (ThuTrongTuan === 0) {
        const listWeekDay = TH2.map(e => {
          const list = getWeek(e, monthWeek, monthYear);
          return list;
        });
        return listWeekDay;
      } else {
        const listWeekDay = TH1.map(e => {
          const list = getWeek(e, monthWeek, monthYear);
          return list;
        });
        return listWeekDay;
      }
    }
    case 2: {
      if (monthYear % 4 === 0) {
        const listWeekDay = TH1.map(e => {
          const list = getWeek(e, monthWeek, monthYear);
          return list;
        });
        return listWeekDay;
      } else {
        if (ThuTrongTuan === 1) {
          const listWeekDay = TH0.map(e => {
            const list = getWeek(e, monthWeek, monthYear);
            return list;
          });
          return listWeekDay;
        } else {
          const listWeekDay = TH1.map(e => {
            const list = getWeek(e, monthWeek, monthYear);
            return list;
          });
          return listWeekDay;
        }
      }
    }
    default:
      if (ThuTrongTuan === 0 || ThuTrongTuan === 6) {
        const listWeekDay = TH3.map(e => {
          const list = getWeek(e, monthWeek, monthYear);
          return list;
        });
        return listWeekDay;
      } else {
        const listWeekDay = TH1.map(e => {
          const list = getWeek(e, monthWeek, monthYear);
          return list;
        });
        return listWeekDay;
      }
  }
};
export const SoSanhMonthBefore = (date: string, dateNow: string) => {
  const setDate = date.split('/');
  const setDateNow = dateNow.split('/');

  const setMonth = setDate[1];
  const setYear = setDate[2];
  const setMonthNow = setDateNow[1];
  const setYearNow = setDateNow[2];

  const month: number = +setMonth;
  const year: number = +setYear;
  const monthNow: number = +setMonthNow;
  const yearNow: number = +setYearNow;

  if (year === yearNow && month === monthNow - 1) {
    return true;
  } else {
    return false;
  }
};
export const Sort = (data: string[]) => {
  const sort = [...data].sort((a, b) => (a > b ? 1 : -1));
  return sort;
};
export const SortDate = (data: Date[]) => {
  const sort = [...data].sort((a, b) => (a > b ? 1 : -1));
  return sort;
};
