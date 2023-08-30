import { useEffect, useState } from 'react';
import DSPhongKham from '../pack/DSPhongKham';
import ThemPhongKham from '../pack/ThemPhongKham';
import ChiTietPhongKham from '../pack/ChiTietPhongKham';
import CapNhapPhongKham from '../pack/CapNhapPhongKham';
import { AccountInferface, AddRoomsInterface, RoomsInterface } from '../../../../@types';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/customRedux';
import { AccountLogin, AddDataRooms, GetDataRoles, UpdateDataRooms } from '../../../../core/redux';
import { isAuthorization1 } from '../../../../shared/isLogin';

export default function ViewPhongKham() {
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

  // const HandleClickOkAddDevice = (
  //   deviceId: string,
  //   deviceType: string,
  //   deviceName: string,
  //   userName: string,
  //   addressIP: string,
  //   password: string,
  //   userDevice: string,
  // ) => {
  //   const newData: AddRoomsInterface = {
  //     addressIP: addressIP,
  //     deviceId: deviceId,
  //     deviceName: deviceName,
  //     deviceType: deviceType,
  //     password: password,
  //     userName: userName,
  //     userService: userDevice,
  //   };
  //   dispatch(AddDataDevices(newData));
  //   alert('Sucess');
  //   setPage('0');
  // };
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
  // const HandleClickOkUpdateDevice = (
  //   deviceId: string,
  //   deviceType: string,
  //   deviceName: string,
  //   userName: string,
  //   addressIP: string,
  //   password: string,
  //   userDevice: string,
  //   listUserDevice: string[],
  // ) => {
  //   const newUserDevice = userDevice + ', ' + listUserDevice.join(', ');
  //   const newData: RoomsInterface = {
  //     key: id,
  //     addressIP: addressIP,
  //     deviceId: deviceId,
  //     deviceName: deviceName,
  //     deviceType: deviceType,
  //     password: password,
  //     userName: userName,
  //     userService: newUserDevice,
  //   };
  //   dispatch(UpdateDataDevices(newData));
  //   alert('Update Success!');
  //   setPage('0');
  // };

  if (checkAuth) {
    return (
      <>
        {page === '0' ? (
          <DSPhongKham
            HandleClickAddRoom={() => setPage('1')}
            HandleClickDescription={HandleClickDescription}
            HandleClickUpdate={HandleClickUpdate}
          />
        ) : page === '1' ? (
          <ThemPhongKham
            HandleClickCancelAddDevice={() => setPage('0')}
            HandleClickOkAddDevice={() => {}}
          />
        ) : page === '2' ? (
          <ChiTietPhongKham
            id={id}
            HandleClickUpdateRoom={HandleClickUpdateDevice}
            HandleClickGoBackRoom={() => setPage('0')}
          />
        ) : (
          <CapNhapPhongKham
            id={id}
            HandleClickCancelUpdateDevice={() => setPage('0')}
            HandleClickOkUpdateDevice={() => {}}
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
