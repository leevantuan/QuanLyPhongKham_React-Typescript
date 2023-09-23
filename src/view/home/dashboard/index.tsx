import './styles.scss';
import React, { useEffect, useState } from 'react';
import { BDCapSoType } from '../../../@types';
import BDCapSo from '../../../shared/components/dashboard/bdCapSo';
import LineChart from '../../../shared/components/dashboard/chart/lineChart';
import { Select } from 'antd';
import NavBar from '../../../layout/navBar';
import DatePicketDashboard from '../../../shared/components/dashboard/datePicket';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/customRedux';
// import { AccountLogin, GetDataRoles, GetDataServices } from '../../../core/redux';
// import { isAuthorization2 } from '../../../shared/isLogin';
import moment from 'moment';
import { SoSanhMonth, SoSanhMonthBefore } from '../../../HandleLogic';
import CustomDoughnut from '../../../shared/components/dashboard/doughnut';
import { TbDeviceImac } from 'react-icons/tb';
import { TbBrandWechat } from 'react-icons/tb';
import { GoStack } from 'react-icons/go';
import { BsDot } from 'react-icons/bs';
import dayjs from 'dayjs';
import DashBoardDoughnut from '../../../shared/components/dashboard/dashboardDoughnut';
import { AccountInferface } from '../../../@types/IUser';
export default function Dashboard() {
  // const dateNow = moment().format('DD/MM/YYYY');
  const dispatch = useAppDispatch();
  // const DataDetailService = useAppSelector(state => state.ServiceDetail.ServiceDetail);
  const DataService = useAppSelector(state => state.Service.Services);
  // const DataDevice = useAppSelector(state => state.Device.Device);
  //check authorization
  const InfoAccount = useAppSelector(state => state.User.User);
  const DataRole = useAppSelector(state => state.Role.Roles);
  useEffect(() => {
    // dispatch(AccountLogin());
    // dispatch(GetDataRoles());
    // dispatch(GetDataServicDetail());
    // dispatch(GetDataServices());
    // dispatch(GetDataDevices());
    // dispatch(GetDataServicDetail());
  }, [dispatch]);
  const [account, setAccount] = useState<AccountInferface>();
  const [checkAuth, setCheckAuth] = useState<boolean>(true);
  // useEffect(() => {
  //   const token = localStorage.getItem('tokenUser');
  //   const findAccount = InfoAccount.find(acc => acc.key === token);
  //   if (findAccount) {
  //     setAccount(findAccount);
  //   }
  // }, [InfoAccount]);
  // useEffect(() => {
  //   if (account) {
  //     const check = isAuthorization2('3', account, DataRole);
  //     setCheckAuth(check);
  //   }
  // }, [account, DataRole]);
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
  // useEffect(() => {
  //   const ListMonthNow = DataDetailService.filter(event => {
  //     const check = SoSanhMonth(event.date, findDate);
  //     if (check === true) {
  //       return event;
  //     } else {
  //       return '';
  //     }
  //   });
  //   const ListMonthBefore = DataDetailService.filter(event => {
  //     const check = SoSanhMonthBefore(event.date, findDate);
  //     if (check === true) {
  //       return event;
  //     } else {
  //       return '';
  //     }
  //   });
  //   if (ListMonthNow.length > 0) {
  //     const daSuDung = ListMonthNow.filter(event => event.status === 'success');
  //     const dangCho = ListMonthNow.filter(event => event.status === 'waiting');
  //     const boQua = ListMonthNow.filter(event => event.status === 'pass');
  //     setDaCap(ListMonthNow.length);
  //     setDaSuDung(daSuDung.length);
  //     setDangCho(dangCho.length);
  //     setBoQua(boQua.length);
  //   }

  //   if (ListMonthBefore.length > 0) {
  //     // const daSuDung = ListMonthNow.filter(event => event.status === 'success');
  //     // const dangCho = ListMonthNow.filter(event => event.status === 'waiting');
  //     // const boQua = ListMonthNow.filter(event => event.status === 'pass');
  //     // const daSuDungBefore = ListMonthBefore.filter(event => event.status === 'success');
  //     // const dangChoBefore = ListMonthBefore.filter(event => event.status === 'waiting');
  //     // const boQuaBefore = ListMonthBefore.filter(event => event.status === 'pass');

  //     // setDaCapPercent((ListMonthNow.length / ListMonthBefore.length) * 100 - 100);
  //     // setDaSuDungPercent((daSuDung.length / daSuDungBefore.length) * 100 - 100);
  //     // setDangChoPercent((dangCho.length / dangChoBefore.length) * 100 - 100);
  //     // setBoQuaPercent((boQua.length / boQuaBefore.length) * 100 - 100);

  //     if (ListMonthNow.length > ListMonthBefore.length) {
  //       setDaCapStatus(true);
  //     } else {
  //       setDaCapStatus(false);
  //     }
  //     if (daSuDung.length > daSuDungBefore.length) {
  //       setDaSuDungStatus(true);
  //     } else {
  //       setDaSuDungStatus(false);
  //     }
  //     if (dangCho.length > dangChoBefore.length) {
  //       setDangChoStatus(true);
  //     } else {
  //       setDangChoStatus(false);
  //     }
  //     if (boQua.length > boQuaBefore.length) {
  //       setBoQuaStatus(true);
  //     } else {
  //       setBoQuaStatus(false);
  //     }
  //   } else {
  //     setDaCapPercent(100);
  //     setDaSuDungPercent(100);
  //     setDangChoPercent(100);
  //     setBoQuaPercent(100);
  //     setDaCapStatus(true);
  //     setDaSuDungStatus(true);
  //     setDangChoStatus(true);
  //     setBoQuaStatus(true);
  //   }
  // }, [DataDetailService, findDate]);
  //end
  useEffect(() => {
    const listBDCapSo: BDCapSoType[] = [
      {
        icons: 1,
        activeColor: 'activeColor-1',
        text: 'Số lượng đã cấp',
        percent: daCapPercent,
        percentStatus: daCapStatus,
        data: daCap,
      },
      {
        icons: 2,
        activeColor: 'activeColor-2',
        text: 'Số lượng đã sử dụng',
        percent: daSuDungPercent,
        percentStatus: daSuDungStatus,
        data: daSuDung,
      },
      {
        icons: 3,
        activeColor: 'activeColor-3',
        text: 'Số lượng đang chờ',
        percent: dangChoPercent,
        percentStatus: dangChoStatus,
        data: dangCho,
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
    // const listDataServiceTrue = DataService.filter(service => service.online === true);
    // setServiceTrueSL(listDataServiceTrue.length);
    // setServiceFalseSL(DataService.length - listDataServiceTrue.length);
    // setServicePercent(Math.round((listDataServiceTrue.length / DataService.length) * 100));
    //deive
    // const listDataDeviceTrue = DataDevice.filter(device => device.online === true);
    // setDeviceTrueSL(listDataDeviceTrue.length);
    // setDeviceFalseSL(DataDevice.length - listDataDeviceTrue.length);
    // setDevicePercent(Math.round((listDataDeviceTrue.length / DataDevice.length) * 100));
  }, [daCap, dangCho, daSuDung, DataService]);
  //end set data percent
  if (checkAuth) {
    return (
      <div className="col-10 d-flex position-relative">
        <NavBar text="Thống Kê" />
        <div className="col-md-8 center-dashboard">
          <h3>Thống kê trong tháng 11</h3>
          <div className="top-center-dashboard d-flex mb-4 ms-4 me-4 justify-content-between">
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
            <div className="chart-line mt-4">
              <LineChart select={selected} />
            </div>
          </div>
        </div>
        <div className="col-md-4 right-dashboard">
          <h3 className="fw-bold">Tổng quan</h3>
          {/* BD 1 */}
          <DashBoardDoughnut
            colorOne="#6493f9"
            colorTwo="#7E7D88"
            percent={75}
            icons="1"
            quantityFalse={25}
            quantityTrue={75}
            textOne="Còn sử dụng"
            textTwo="Không sử dụng"
            textTitle="Dịch Vụ"
          />
          {/* BD 2 */}
          <DashBoardDoughnut
            colorOne="#039800"
            colorTwo="#7E7D88"
            percent={88}
            icons="1"
            quantityFalse={12}
            quantityTrue={88}
            textOne="Có BHYT"
            textTwo="Không BHYT"
            textTitle="BHYT"
          />
          {/* BD 1 */}
          <DashBoardDoughnut
            colorOne="#ffac6a"
            colorTwo="#7E7D88"
            percent={80}
            icons="3"
            quantityFalse={20}
            quantityTrue={80}
            textOne="Đã sử dụng"
            textTwo="Đang chờ"
            textTitle="Cấp Số"
          />
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
