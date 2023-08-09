import './styles.scss';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { DatePickerProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { DataServiceDetailInterface } from '../../../../@types';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/customRedux';
import NavBar from '../../../../layout/navBar';
import CustomTable from '../../../../shared/components/table';
import { GetDataUserHistorys } from '../../../../core/redux';
import InputSearch from '../../../../shared/components/inputSearch';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

export default function ViewNhatKi() {
  //colunms device
  const columns: ColumnsType<DataServiceDetailInterface> = [
    {
      key: 'userName',
      title: 'Tên đăng nhập',
      dataIndex: 'userName',
    },
    {
      key: 'dateTIme',
      title: 'Thời gian tác động',
      render: (_, record) => <p>{record.date + ' ' + record.time}</p>,
    },
    {
      key: 'addressIP',
      title: 'IP thực hiện',
      dataIndex: 'addressIP',
    },
    {
      key: 'operation',
      title: 'Thao tác thực hiện',
      dataIndex: 'operation',
    },
  ];
  const dispatch = useAppDispatch();
  const ListUserHistory = useAppSelector(state => state.UserHistory.UserHistory);

  //get data Services
  useEffect(() => {
    dispatch(GetDataUserHistorys());
  }, [dispatch]);
  //   useEffect(() => {
  //     const newSearchText = ListServices.filter(service => service.serviceId.includes(inputSearch));
  //     const newFilterOnline = newSearchText.filter(service => {
  //       if (onlineState === 'Hoạt động') {
  //         return service.online === true;
  //       } else if (onlineState === 'Ngưng hoạt động') {
  //         return service.online === false;
  //       } else {
  //         return service;
  //       }
  //     });
  //     setNewList(newFilterOnline);
  //   }, [inputSearch, onlineState, ListServices]);

  const onChangeFromDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const onChangeToDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar textLv1="Cài đặt hệ thống >" textLv2="" textLv3=" Quản lí người dùng" />
      <div className="content-DS-NhatKi">
        <div className="navbar-DS-NhatKi d-flex ms-4">
          <div className="mt-2">
            <p>Chọn thời gian</p>
            <DatePicker
              defaultValue={dayjs('01/01/2015', dateFormatList[0])}
              format={dateFormatList}
              onChange={onChangeFromDate}
            />
            {' > '}
            <DatePicker
              defaultValue={dayjs('01/01/2015', dateFormatList[0])}
              format={dateFormatList}
              onChange={onChangeToDate}
            />
          </div>
          <div className="mt-2">
            <p>Từ khóa</p>
            <InputSearch HandleInputSearch={e => {}} width={400} placeholder="Nhập từ khóa" />
          </div>
        </div>
        <div className="list-DS-NhatKi m-4 ">
          <CustomTable data={ListUserHistory} columns={columns} />
        </div>
      </div>
    </div>
  );
}
