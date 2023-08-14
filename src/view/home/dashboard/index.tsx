import './styles.scss';
import React, { useEffect, useState } from 'react';
import { AccountInferface, BDCapSoType } from '../../../@types';
import BDCapSo from '../../../shared/components/dashboard/bdCapSo';
import LineChart from '../../../shared/components/dashboard/chart/lineChart';
import { Select } from 'antd';
import NavBar from '../../../layout/navBar';
import DatePicketDashboard from '../../../shared/components/dashboard/datePicket';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/customRedux';
import {
  AccountLogin,
  GetDataDevices,
  GetDataRoles,
  GetDataServicDetail,
  GetDataServices,
} from '../../../core/redux';
import { isAuthorization2 } from '../../../shared/isLogin';
import moment from 'moment';
import { SoSanhMonth, SoSanhMonthBefore } from '../../../HandleLogic';
import CustomDoughnut from '../../../shared/components/dashboard/doughnut';
import { TbDeviceImac } from 'react-icons/tb';
import { TbBrandWechat } from 'react-icons/tb';
import { GoStack } from 'react-icons/go';
import { BsDot } from 'react-icons/bs';
import CustomDoughnutThree from '../../../shared/components/dashboard/doughnut3';
import dayjs from 'dayjs';
export default function Dashboard() {
  // const dateNow = moment().format('DD/MM/YYYY');
  const dispatch = useAppDispatch();
  const DataDetailService = useAppSelector(state => state.ServiceDetail.ServiceDetail);
  const DataService = useAppSelector(state => state.Service.Service);
  const DataDevice = useAppSelector(state => state.Device.Device);
  //check authorization
  const InfoAccount = useAppSelector(state => state.Account.Account);
  const DataRole = useAppSelector(state => state.Role.Role);
  useEffect(() => {
    dispatch(AccountLogin());
    dispatch(GetDataRoles());
    dispatch(GetDataServicDetail());
    dispatch(GetDataServices());
    dispatch(GetDataDevices());
    dispatch(GetDataServicDetail());
  }, [dispatch]);
  const [account, setAccount] = useState<AccountInferface>();
  const [checkAuth, setCheckAuth] = useState<boolean>();
  useEffect(() => {
    const token = localStorage.getItem('tokenUser');
    const findAccount = InfoAccount.find(acc => acc.key === token);
    if (findAccount) {
      setAccount(findAccount);
    }
  }, [InfoAccount]);
  useEffect(() => {
    if (account) {
      const check = isAuthorization2('3', account, DataRole);
      setCheckAuth(check);
    }
  }, [account, DataRole]);
  //end
  //date picket
  const dateNowView = moment().format('DD MMM YYYY');
  const findDateNow = moment().format('DD/MM/YYYY');

  const [newDate, setNewDate] = useState<string>(dateNowView);
  const [findDate, setFindDate] = useState<string>(findDateNow);

  const HandleClickSetDate = (value: dayjs.Dayjs) => {
    const day: number = value.date();
    const month: number = value.month();
    const year: number = value.year();
    let setDay = '';
    let setMonth = '';
    if (String(day).length === 1) {
      setDay = `0${day}`;
    } else {
      setDay = `${day}`;
    }
    if (String(month).length === 1 && month !== 9) {
      setMonth = `0${month + 1}`;
    } else {
      setMonth = `${month + 1}`;
    }
    const setDate = `${setMonth}/${setDay}/${year}`;
    const date = new Date(setDate);
    const newDate = moment(date).format('DD MMM YYYY');
    setFindDate(`${setDay}/${setMonth}/${year}`);
    setNewDate(newDate);
  };
  //end
  const [selected, setSelected] = useState<string>('Ngày');
  const [daCap, setDaCap] = useState<number>(0);
  const [daSuDung, setDaSuDung] = useState<number>(0);
  const [dangCho, setDangCho] = useState<number>(0);
  const [boQua, setBoQua] = useState<number>(0);
  const [daCapPercent, setDaCapPercent] = useState<number>(0);
  const [daSuDungPercent, setDaSuDungPercent] = useState<number>(0);
  const [dangChoPercent, setDangChoPercent] = useState<number>(0);
  const [boQuaPercent, setBoQuaPercent] = useState<number>(0);
  const [daCapStatus, setDaCapStatus] = useState<boolean>(true);
  const [daSuDungStatus, setDaSuDungStatus] = useState<boolean>(true);
  const [dangChoStatus, setDangChoStatus] = useState<boolean>(true);
  const [boQuaStatus, setBoQuaStatus] = useState<boolean>(true);
  const [listBDCapSo, setListBDCapSo] = useState<BDCapSoType[]>([]);
  //set data
  useEffect(() => {
    const ListMonthNow = DataDetailService.filter(event => {
      const check = SoSanhMonth(event.date, findDate);
      if (check === true) {
        return event;
      } else {
        return '';
      }
    });
    const ListMonthBefore = DataDetailService.filter(event => {
      const check = SoSanhMonthBefore(event.date, findDate);
      if (check === true) {
        return event;
      } else {
        return '';
      }
    });
    if (ListMonthNow.length > 0) {
      const daSuDung = ListMonthNow.filter(event => event.status === 'success');
      const dangCho = ListMonthNow.filter(event => event.status === 'waiting');
      const boQua = ListMonthNow.filter(event => event.status === 'pass');
      setDaCap(ListMonthNow.length);
      setDaSuDung(daSuDung.length);
      setDangCho(dangCho.length);
      setBoQua(boQua.length);
    }

    if (ListMonthBefore.length > 0) {
      const daSuDung = ListMonthNow.filter(event => event.status === 'success');
      const dangCho = ListMonthNow.filter(event => event.status === 'waiting');
      const boQua = ListMonthNow.filter(event => event.status === 'pass');
      const daSuDungBefore = ListMonthBefore.filter(event => event.status === 'success');
      const dangChoBefore = ListMonthBefore.filter(event => event.status === 'waiting');
      const boQuaBefore = ListMonthBefore.filter(event => event.status === 'pass');

      setDaCapPercent((ListMonthNow.length / ListMonthBefore.length) * 100 - 100);
      setDaSuDungPercent((daSuDung.length / daSuDungBefore.length) * 100 - 100);
      setDangChoPercent((dangCho.length / dangChoBefore.length) * 100 - 100);
      setBoQuaPercent((boQua.length / boQuaBefore.length) * 100 - 100);

      if (ListMonthNow.length > ListMonthBefore.length) {
        setDaCapStatus(true);
      } else {
        setDaCapStatus(false);
      }
      if (daSuDung.length > daSuDungBefore.length) {
        setDaSuDungStatus(true);
      } else {
        setDaSuDungStatus(false);
      }
      if (dangCho.length > dangChoBefore.length) {
        setDangChoStatus(true);
      } else {
        setDangChoStatus(false);
      }
      if (boQua.length > boQuaBefore.length) {
        setBoQuaStatus(true);
      } else {
        setBoQuaStatus(false);
      }
    } else {
      setDaCapPercent(100);
      setDaSuDungPercent(100);
      setDangChoPercent(100);
      setBoQuaPercent(100);
      setDaCapStatus(true);
      setDaSuDungStatus(true);
      setDangChoStatus(true);
      setBoQuaStatus(true);
    }
  }, [DataDetailService, findDate]);
  //end
  useEffect(() => {
    const listBDCapSo: BDCapSoType[] = [
      {
        icons: 1,
        activeColor: 'activeColor-1',
        text: 'Số thứ tự đã cấp',
        percent: daCapPercent,
        percentStatus: daCapStatus,
        data: daCap,
      },
      {
        icons: 2,
        activeColor: 'activeColor-2',
        text: 'Số thứ tự đã sử dụng',
        percent: daSuDungPercent,
        percentStatus: daSuDungStatus,
        data: daSuDung,
      },
      {
        icons: 3,
        activeColor: 'activeColor-3',
        text: 'Số thứ tự đang chờ',
        percent: dangChoPercent,
        percentStatus: dangChoStatus,
        data: dangCho,
      },
      {
        icons: 4,
        activeColor: 'activeColor-4',
        text: 'Số thứ tự đã bỏ qua',
        percent: boQuaPercent,
        percentStatus: boQuaStatus,
        data: boQua,
      },
    ];
    setListBDCapSo(listBDCapSo);
  }, [
    boQua,
    boQuaPercent,
    boQuaStatus,
    daCap,
    daCapPercent,
    daCapStatus,
    daSuDung,
    daSuDungPercent,
    daSuDungStatus,
    dangCho,
    dangChoPercent,
    dangChoStatus,
  ]);

  const handleChangeSelect = (value: string) => {
    setSelected(value);
  };

  const [capSoPercent, setCapSoPercent] = useState(0);
  const [capSoPercent2, setCapSoPercent2] = useState(0);
  const [servicePercent, setServicePercent] = useState(0);
  const [devicePercent, setDevicePercent] = useState(0);
  const [deviceTrueSL, setDeviceTrueSL] = useState(0);
  const [deviceFalseSL, setDeviceFalseSL] = useState(0);
  const [serviceTrueSL, setServiceTrueSL] = useState(0);
  const [serviceFalseSL, setServiceFalseSL] = useState(0);
  // set data percent
  useEffect(() => {
    const percentCapSo1 = (dangCho / daCap) * 100;
    const percentCapSo2 = (daSuDung / daCap) * 100;
    setCapSoPercent(Math.round(percentCapSo1));
    setCapSoPercent2(Math.round(percentCapSo2));
    //service
    const listDataServiceTrue = DataService.filter(service => service.online === true);
    setServiceTrueSL(listDataServiceTrue.length);
    setServiceFalseSL(DataService.length - listDataServiceTrue.length);
    setServicePercent(Math.round((listDataServiceTrue.length / DataService.length) * 100));
    //deive
    const listDataDeviceTrue = DataDevice.filter(device => device.online === true);
    setDeviceTrueSL(listDataDeviceTrue.length);
    setDeviceFalseSL(DataDevice.length - listDataDeviceTrue.length);
    setDevicePercent(Math.round((listDataDeviceTrue.length / DataDevice.length) * 100));
  }, [daCap, dangCho, daSuDung, DataService, DataDevice]);
  //end set data percent
  if (checkAuth) {
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
              <LineChart select={selected} />
            </div>
          </div>
        </div>
        <div className="col-md-4 right-dashboard">
          <h3 className="fw-bold">Tổng quan</h3>
          {/* BD 1 */}
          <div className="BD-percent ms-4 d-flex">
            <div style={{ width: 150, height: 115 }}>
              <CustomDoughnut colorOne="#FF7506" colorTwo="#7E7D88" percent={devicePercent} />
            </div>
            <div style={{ width: 120, height: 115, marginTop: 24 }}>
              <h3 className="fw-bold">{deviceTrueSL + deviceFalseSL}</h3>
              <p style={{ color: '#FF7506', fontSize: 20 }}>
                <span className="me-2" style={{ fontSize: 20 }}>
                  <TbDeviceImac />
                </span>
                Thiết bị
              </p>
            </div>
            <div style={{ height: 115, marginTop: 24 }}>
              <p className="d-flex">
                <span style={{ color: '#ff7506', fontSize: 20 }}>
                  <BsDot />
                </span>
                Đang hoạt động
                <p style={{ marginLeft: 16, color: '#FF7506', fontWeight: 'bold' }}>
                  {' '}
                  {deviceTrueSL}
                </p>
              </p>
              <p className="mt-2 d-flex">
                <span style={{ color: '#7e7d88', fontSize: 20 }}>
                  <BsDot />
                </span>
                Ngưng hoạt động
                <p style={{ color: '#FF7506', fontWeight: 'bold', marginLeft: 6 }}>
                  {' '}
                  {deviceFalseSL}
                </p>
              </p>
            </div>
          </div>
          {/* BD 2 */}
          <div className="BD-percent ms-4 d-flex">
            <div style={{ width: 150, height: 115 }}>
              <CustomDoughnut colorOne="#4277FF" colorTwo="#7E7D88" percent={servicePercent} />
            </div>
            <div style={{ width: 120, height: 115, marginTop: 24 }}>
              <h3 className="fw-bold">{serviceTrueSL + serviceFalseSL}</h3>
              <p style={{ color: '#4277FF', fontSize: 20 }}>
                <span className="me-2" style={{ fontSize: 20 }}>
                  <TbBrandWechat />
                </span>
                Dịch vụ
              </p>
            </div>
            <div style={{ height: 115, marginTop: 24 }}>
              <p className="d-flex">
                <span style={{ color: '#4277FF', fontSize: 20 }}>
                  <BsDot />
                </span>
                Đang hoạt động
                <p style={{ marginLeft: 16, color: '#4277FF', fontWeight: 'bold' }}>
                  {' '}
                  {serviceTrueSL}
                </p>
              </p>
              <p className="mt-2 d-flex">
                <span style={{ color: '#7e7d88', fontSize: 20 }}>
                  <BsDot />
                </span>
                Ngưng hoạt động
                <p style={{ color: '#4277FF', fontWeight: 'bold', marginLeft: 6 }}>
                  {' '}
                  {serviceFalseSL}
                </p>
              </p>
            </div>
          </div>
          {/* BD 3 */}
          <div className="BD-percent ms-4 d-flex">
            <div style={{ width: 150, height: 115 }}>
              <CustomDoughnutThree
                colorOne="#35C75A"
                colorTwo="#7E7D88"
                percent={capSoPercent}
                colorThree="#F178B6"
                percentTwo={capSoPercent2}
              />
            </div>
            <div style={{ width: 120, height: 115, marginTop: 24 }}>
              <h3 className="fw-bold">{daCap}</h3>
              <p style={{ color: '#35C75A', fontSize: 20 }}>
                <span className="me-2" style={{ fontSize: 20 }}>
                  <GoStack />
                </span>
                Cấp số
              </p>
            </div>
            <div style={{ height: 115, marginTop: 12 }}>
              <p className="d-flex">
                <span style={{ color: '#35C75A', fontSize: 20 }}>
                  <BsDot />
                </span>
                Đang chờ
                <p style={{ marginLeft: 65, color: '#35C75A', fontWeight: 'bold' }}> {dangCho}</p>
              </p>
              <p className="mt-1 d-flex">
                <span style={{ color: '#7e7d88', fontSize: 20 }}>
                  <BsDot />
                </span>
                Đã sử dụng
                <p style={{ color: '#35C75A', fontWeight: 'bold', marginLeft: 50 }}> {daSuDung}</p>
              </p>
              <p className="mt-1 d-flex">
                <span style={{ color: '#7e7d88', fontSize: 20 }}>
                  <BsDot />
                </span>
                Bỏ qua
                <p style={{ color: '#35C75A', fontWeight: 'bold', marginLeft: 80 }}> {boQua}</p>
              </p>
            </div>
          </div>
          <div className="ms-4 mt-4">
            <DatePicketDashboard HandleClickDate={HandleClickSetDate} setDate={newDate} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          width: 800,
          marginTop: 400,
          marginLeft: 300,
          textAlign: 'center',
        }}
      >
        <h1 className="fw-bold">Đăng nhập bằng tài khoản khác để sử dụng dịch vụ này</h1>
      </div>
    );
  }
}
