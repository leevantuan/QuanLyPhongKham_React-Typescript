import './styles.scss';
import React, { useState } from 'react';
import { BDCapSoType } from '../../../@types';
import BDCapSo from '../../../shared/components/dashboard/bdCapSo';
import LineChart from '../../../shared/components/dashboard/chart/lineChart';
import { Select } from 'antd';
import NavBar from '../../../layout/navBar';
import DatePicketDashboard from '../../../shared/components/dashboard/datePicket';

const listBDCapSo: BDCapSoType[] = [
  {
    icons: 1,
    activeColor: 'activeColor-1',
    text: 'Số thứ tự đã cấp',
    percent: 32.32,
    percentStatus: true,
    data: 221,
  },
  {
    icons: 2,
    activeColor: 'activeColor-2',
    text: 'Số thứ tự đã sử dụng',
    percent: 32.32,
    percentStatus: false,
    data: 721,
  },
  {
    icons: 3,
    activeColor: 'activeColor-3',
    text: 'Số thứ tự đang chờ',
    percent: 32.32,
    percentStatus: true,
    data: 468,
  },
  {
    icons: 4,
    activeColor: 'activeColor-4',
    text: 'Số thứ tự đã bỏ qua',
    percent: 32.32,
    percentStatus: false,
    data: 32,
  },
];

export default function Dashboard() {
  const [selected, setSelected] = useState<string>('Ngày');

  const handleChangeSelect = (value: string) => {
    setSelected(value);
  };
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar textLv3="Dashboard" textLv1="" textLv2="" />
      <div className="col-md-8 center-dashboard">
        <h3 className="fw-bold">Biểu đồ cấp số</h3>
        <div className="top-center-dashboard d-flex m-4">
          {/* bieu do cap so */}
          {listBDCapSo.map(event => {
            return (
              <BDCapSo
                key={event.icons}
                icons={event.icons}
                activeColor={event.activeColor}
                text={event.text}
                data={event.data}
                percent={event.percent}
                percentStatus={event.percentStatus}
              />
            );
          })}
          {/* bieu do cap so */}
        </div>
        <div className="bottom-center-dashboard p-3">
          <div className="d-flex justify-content-between">
            <div className="title-BTK">
              <h3 className="fw-bold">
                {selected === 'Ngày'
                  ? 'Bảng thống kê theo ngày'
                  : selected === 'Tuần'
                  ? 'Bảng thống kê theo tuần'
                  : 'Bảng thống kê theo tháng'}
              </h3>
              <p>{selected === 'Tháng' ? 'Năm 2023' : 'Tháng 11/2023'}</p>
            </div>
            <div className="filter-BTK d-flex">
              <h5 className="fw-bold">Xem theo</h5>
              <div>
                <Select
                  value={selected}
                  className="custom-select-dashboard"
                  onChange={handleChangeSelect}
                  options={[
                    { value: 'Ngày', label: 'Ngày' },
                    { value: 'Tuần', label: 'Tuần' },
                    { value: 'Tháng', label: 'Tháng' },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="chart-line">
            <LineChart />
          </div>
        </div>
      </div>
      <div className="col-md-4 right-dashboard">
        <h3 className="fw-bold">Tổng quan</h3>
        <DatePicketDashboard />
      </div>
    </div>
  );
}
