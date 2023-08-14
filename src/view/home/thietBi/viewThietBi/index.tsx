import { useEffect, useState } from 'react';
import DSThietBi from '../pack/DSThietBi';
import ThemThietBi from '../pack/ThemThietBi';
import ChiTietThietBi from '../pack/ChiTietThietBi';
import CapNhapThietBi from '../pack/CapNhapThietBi';
import { AccountInferface, AddDeviceModalInterface, DeviceInterface } from '../../../../@types';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/customRedux';
import {
  AccountLogin,
  AddDataDevices,
  GetDataRoles,
  UpdateDataDevices,
} from '../../../../core/redux';
import { isAuthorization1 } from '../../../../shared/isLogin';

export default function ViewThietBi() {
  const dispatch = useAppDispatch();
  //check authorization
  const InfoAccount = useAppSelector(state => state.Account.Account);
  const DataRole = useAppSelector(state => state.Role.Role);
  useEffect(() => {
    dispatch(AccountLogin());
    dispatch(GetDataRoles());
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
      const check = isAuthorization1('3', account, DataRole);
      setCheckAuth(check);
    }
  }, [account, DataRole]);
  //end

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

  if (checkAuth) {
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
