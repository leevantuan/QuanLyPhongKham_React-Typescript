import { useState } from 'react';
import DSThietBi from '../pack/DSThietBi';
import ThemThietBi from '../pack/ThemThietBi';
import ChiTietThietBi from '../pack/ChiTietThietBi';
import CapNhapThietBi from '../pack/CapNhapThietBi';
import { AddDeviceModalInterface, DeviceInterface } from '../../../../@types';
import { useAppDispatch } from '../../../../shared/hooks/customRedux';
import { AddDataDevices, UpdateDataDevices } from '../../../../core/redux';

export default function ViewThietBi() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<string>('0');
  const [id, setId] = useState<string>('');

  const HandleClickOkAddDevice = (
    deviceId: string,
    deviceType: string,
    deviceName: string,
    userName: string,
    addressIP: string,
    password: string,
    userDevice: string,
  ) => {
    const newData: AddDeviceModalInterface = {
      addressIP: addressIP,
      deviceId: deviceId,
      deviceName: deviceName,
      deviceType: deviceType,
      password: password,
      userName: userName,
      userService: userDevice,
    };
    dispatch(AddDataDevices(newData));
    alert('Sucess');
    setPage('0');
  };
  const HandleClickDescription = (key: string) => {
    setId(key);
    setPage('2');
  };
  const HandleClickUpdate = (key: string) => {
    setId(key);
    setPage('3');
  };
  const HandleClickUpdateDevice = (key: string) => {
    setId(key);
    setPage('3');
  };
  //update device
  const HandleClickOkUpdateDevice = (
    deviceId: string,
    deviceType: string,
    deviceName: string,
    userName: string,
    addressIP: string,
    password: string,
    userDevice: string,
    listUserDevice: string[],
  ) => {
    const newUserDevice = userDevice + ', ' + listUserDevice.join(', ');
    const newData: DeviceInterface = {
      key: id,
      addressIP: addressIP,
      deviceId: deviceId,
      deviceName: deviceName,
      deviceType: deviceType,
      password: password,
      userName: userName,
      userService: newUserDevice,
    };
    dispatch(UpdateDataDevices(newData));
    alert('Update Success!');
    setPage('0');
  };
  return (
    <>
      {page === '0' ? (
        <DSThietBi
          HandleClickAddDevice={() => setPage('1')}
          HandleClickDescription={HandleClickDescription}
          HandleClickUpdate={HandleClickUpdate}
        />
      ) : page === '1' ? (
        <ThemThietBi
          HandleClickCancelAddDevice={() => setPage('0')}
          HandleClickOkAddDevice={HandleClickOkAddDevice}
        />
      ) : page === '2' ? (
        <ChiTietThietBi
          id={id}
          HandleClickUpdateDevice={HandleClickUpdateDevice}
          HandleClickGoBackDevice={() => setPage('0')}
        />
      ) : (
        <CapNhapThietBi
          id={id}
          HandleClickCancelUpdateDevice={() => setPage('0')}
          HandleClickOkUpdateDevice={HandleClickOkUpdateDevice}
        />
      )}
    </>
  );
}
