import React, { useEffect, useState } from 'react';
import DanhSachCapSo from '../pack/DSCapSo';
import CapSo from '../pack/CapSo';
import ProfileCustomer from '../pack/profileCustomer';
import { ConvertToTimestamp, HandleDateIncrease } from '../../../../HandleLogic';
import { useAppDispatch } from '../../../../shared/hooks/customRedux';
import { AddDataHistory, AddDataServicDetail } from '../../../../core/redux';
import { AddHistoryInterface, DataAddServiceDetailInterface } from '../../../../@types';
import InSo from '../pack/inSo';
import ChiTietCapSo from '../pack/chiTietCapSo';

export default function ViewCapSo() {
  const dispatch = useAppDispatch();

  const [source, setSource] = useState<string>('');
  useEffect(() => {
    const token = localStorage.getItem('tokenUser');
    if (token) {
      setSource('Hệ thống');
    } else {
      setSource('Kiosk');
    }
  }, []);

  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<string>('0');
  const [customerName, setCustomerName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [soThuTu, setSoThuTu] = useState<string>('');
  const [dateTime, setDateTime] = useState<Date>();
  const [toDateTime, setToDateTime] = useState<Date>();
  const [serviceName, setServiceName] = useState<string>('');
  const [couter, setCouter] = useState<string>('');
  const [id, setId] = useState<string>('');

  useEffect(() => {
    if (page === '0') {
      setCustomerName('');
      setEmail('');
      setPhoneNumber('');
    }
  }, [page]);

  const HandleClickCapSoMoi = (
    capso: string,
    dateTimeNow: Date,
    serviceId: string,
    serviceName: string,
  ) => {
    const toDate = HandleDateIncrease(dateTimeNow);
    const toDateTime = ConvertToTimestamp(toDate, '17:30:00');
    const newDataServiceDetail: DataAddServiceDetailInterface = {
      serviceId: serviceId,
      serviceName: serviceName,
      stt: capso,
      date: dateTimeNow,
      toDate: toDateTime,
      customerName: customerName,
      email: email,
      phoneNumber: phoneNumber,
      source: source,
    };
    const newDataHistory: AddHistoryInterface = {
      userName: customerName,
      dateTime: dateTimeNow,
    };
    setOpen(true);
    setSoThuTu(capso);
    setServiceName(serviceName);
    setDateTime(dateTimeNow);
    setToDateTime(toDateTime);
    setCouter(serviceId[serviceId.length - 1]);
    dispatch(AddDataServicDetail(newDataServiceDetail));
    dispatch(AddDataHistory(newDataHistory));
    setPage('0');
  };

  return (
    <>
      <InSo
        open={open}
        HandleClickCacel={() => setOpen(false)}
        dateTime={dateTime}
        servicerName={serviceName}
        stt={soThuTu}
        toDateTime={toDateTime}
        couter={couter}
      />
      {page === '0' ? (
        <DanhSachCapSo
          HandleClickAddCapSo={() => setPage('1')}
          HandleClickChiTietCapSo={id => {
            setId(id);
            setPage('3');
          }}
        />
      ) : page === '1' ? (
        <ProfileCustomer
          HandleClickCancel={() => setPage('0')}
          HandleClickContinue={(customerName: string, email: string, phoneNumber: string) => {
            if (customerName || email || phoneNumber) {
              setCustomerName(customerName);
              setEmail(email);
              setPhoneNumber(phoneNumber);
              setPage('2');
            } else {
              alert('Vui lòng nhập đầy đủ thông tin');
            }
          }}
          customerName={customerName}
          email={email}
          phoneNumber={phoneNumber}
        />
      ) : page === '2' ? (
        <CapSo
          HandleClickAddCapSo={HandleClickCapSoMoi}
          HandleClickCancelCapSo={() => setPage('1')}
        />
      ) : (
        <ChiTietCapSo id={id} HandleClickGoBack={() => setPage('0')} />
      )}
    </>
  );
}
