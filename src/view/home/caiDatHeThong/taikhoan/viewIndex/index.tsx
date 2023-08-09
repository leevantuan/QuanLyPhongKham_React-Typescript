import { useState } from 'react';
import { useAppDispatch } from '../../../../../shared/hooks/customRedux';
import DSTaiKhoan from '../pack/DSTaiKhoan';
import ThemTaiKhoan from '../pack/themTaiKhoan';
import CapNhapTaiKhoan from '../pack/capNhapTaiKhoan';
import { AddDataAccount, UpdateDataAccounts } from '../../../../../core/redux';
import { AddDataAccountInferface, UpdateDataAccountInferface } from '../../../../../@types';

export default function ViewTaiKhoan() {
  const dispatch = useAppDispatch();
  //   const InfoAccount = useAppSelector(state => state.Account.Account);
  //   useEffect(() => {
  //     dispatch(AccountLogin());
  //   }, [dispatch]);

  const [page, setPage] = useState<string>('0');
  const [id, setId] = useState<string>('');

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
                dispatch(AddDataAccount(newData));
                alert('Add success');
                setPage('0');
              } else {
                alert('Vui lòng kiểm tra lại password');
              }
            } else {
              alert('Vui lòng kiểm tra lại thông tin');
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
                dispatch(UpdateDataAccounts(newData));
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
}
