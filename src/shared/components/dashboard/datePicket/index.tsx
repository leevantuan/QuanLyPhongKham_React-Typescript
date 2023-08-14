import './styles.scss';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import dayLocaleData from 'dayjs/plugin/localeData';
import { Calendar, Select, Typography, theme } from 'antd';
import moment from 'moment';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';
import { DatePicketInterface } from '../../../../@types';

dayjs.extend(dayLocaleData);

export default function DatePicketDashboard(props: DatePicketInterface) {
  const { token } = theme.useToken();
  const dateNow = moment().format('DD MMM YYYY');
  // const findDateNow = moment().format('DD/MM/YYYY');

  const [newDate, setNewDate] = useState<string>(dateNow);
  // const [findDate, setFindDate] = useState<string>(findDateNow);
  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  // const HandleClickSetDate = (value: dayjs.Dayjs) => {
  //   const day: number = value.date();
  //   const month: number = value.month();
  //   const year: number = value.year();
  //   let setDay = '';
  //   let setMonth = '';
  //   if (String(day).length === 1) {
  //     setDay = `0${day}`;
  //   } else {
  //     setDay = `${day}`;
  //   }
  //   if (String(month).length === 1 && month !== 9) {
  //     setMonth = `0${month + 1}`;
  //   } else {
  //     setMonth = `${month + 1}`;
  //   }
  //   const setDate = `${setMonth}/${setDay}/${year}`;
  //   const date = new Date(setDate);
  //   const newDate = moment(date).format('DD MMM YYYY');
  //   setFindDate(`${setDay}/${setMonth}/${year}`);
  //   setNewDate(newDate);
  // };

  useEffect(() => {
    if (props.setDate) {
      setNewDate(props.setDate);
    }
  }, [props.setDate]);
  return (
    <div style={wrapperStyle}>
      <Calendar
        fullscreen={false}
        // onSelect={value => HandleClickSetDate(value)}
        onSelect={value => props.HandleClickDate(value)}
        headerRender={({ value, onChange }) => {
          const year = value.year();
          const month = value.month();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>,
            );
          }

          return (
            <div style={{ padding: 8 }}>
              <Typography.Title level={4}>
                <div className="d-flex justify-content-between custom-date">
                  <p
                    onClick={() => {
                      const now = value.clone().month(month - 1);
                      onChange(now);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <AiOutlineLeft />
                  </p>
                  {newDate}
                  <p
                    onClick={() => {
                      const now = value.clone().month(month + 1);
                      onChange(now);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <AiOutlineRight />
                  </p>
                </div>
              </Typography.Title>
            </div>
          );
        }}
      />
    </div>
  );
}
