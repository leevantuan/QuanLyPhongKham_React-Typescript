import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import DSTaiKhoan from '../pack/DSTaiKhoan';
import ThemTaiKhoan from '../pack/themTaiKhoan';
import CapNhapTaiKhoan from '../pack/capNhapTaiKhoan';
// import {
//   AccountLogin,
//   AddDataAccount,
//   GetDataRoles,
//   UpdateDataAccounts,
// } from '../../../../../core/redux';
import { AddDataAccountInferface, UpdateDataAccountInferface } from '../../../../../@types';
// import { isAuthorization1 } from '../../../../../shared/isLogin';
import { AccountInferface } from '../../../../../@types/IUser';

export default function ViewTaiKhoan() {
  const dispatch = useAppDispatch();
  //check authorization
  const InfoAccount = useAppSelector(state => state.User.User);
  const DataRole = useAppSelector(state => state.Role.Roles);
  useEffect(() => {
    // dispatch(AccountLogin());
    // dispatch(GetDataRoles());
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
  //     const check = isAuthorization1('1', account, DataRole);
  //     setCheckAuth(check);
  //   }
  // }, [account, DataRole]);
  //end

  const [page, setPage] = useState<string>('0');
  const [id, setId] = useState<string>('');

  if (checkAuth) {
    return (
      <>
        {page === '0' ? (
          <DSTaiKhoan
            HandleClickAddAccount={() => setPage('1')}
            HandleClickUpdateAccount={(id: string) => {
              setId(id);
              setPage('3');
            }}
          />
        ) : page === '1' ? (
          <ThemTaiKhoan
            HandleClickCancelAddAccount={() => setPage('0')}
            HandleClickOkAddAccount={(
              myFullName: string,
              userName: string,
              phoneNumber: string,
              password: string,
              confirmPassword: string,
              email: string,
              role: string,
              status: string,
            ) => {
              // const checkLogin = InfoAccount.find(acc => acc.userName === userName);
              const checkLogin = true;
              if (checkLogin) {
                alert('Tên đăng nhập đã được sử dụng');
              } else {
                if (
                  myFullName &&
                  phoneNumber &&
                  password &&
                  confirmPassword &&
                  email &&
                  role !== 'Chọn vai trò'
                ) {
                  if (password === confirmPassword) {
                    const newData: AddDataAccountInferface = {
                      myFullName: myFullName,
                      userName: userName,
                      phoneNumber: phoneNumber,
                      password: password,
                      email: email,
                      role: role,
                      img: '',
                      status: status === 'true' ? true : false,
                    };
                    // dispatch(AddDataAccount(newData));
                    alert('Add success');
                    setPage('0');
                  } else {
                    alert('Vui lòng kiểm tra lại password');
                  }
                } else {
                  alert('Vui lòng kiểm tra lại thông tin');
                }
              }
            }}
          />
        ) : (
          <CapNhapTaiKhoan
            HandleClickCancelUpdateAccount={() => setPage('0')}
            HandleClickOkUpdateAccount={(
              myFullName: string,
              userName: string,
              phoneNumber: string,
              password: string,
              confirmPassword: string,
              email: string,
              role: string,
              status: string,
            ) => {
              if (
                myFullName &&
                userName &&
                phoneNumber &&
                password &&
                confirmPassword &&
                email &&
                role !== 'Chọn vai trò'
              ) {
                if (password === confirmPassword) {
                  const newData: UpdateDataAccountInferface = {
                    key: id,
                    myFullName: myFullName,
                    userName: userName,
                    phoneNumber: phoneNumber,
                    password: password,
                    email: email,
                    role: role,
                    img: '',
                    status: status === 'true' ? true : false,
                  };
                  // dispatch(UpdateDataAccounts(newData));
                  alert('Update success');
                  setPage('0');
                } else {
                  alert('Vui lòng kiểm tra lại password');
                }
              } else {
                alert('Vui lòng kiểm tra lại thông tin');
              }
            }}
            id={id}
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
