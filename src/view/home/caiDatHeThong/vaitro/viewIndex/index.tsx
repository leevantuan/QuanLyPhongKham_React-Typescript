import { useEffect, useState } from 'react';
import DSVaiTro from '../pack/DSVaitro';
import ThemVaiTro from '../pack/themVaiTro';
import CapNhapVaiTro from '../pack/CapNhapVaiTro';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import {
  AccountLogin,
  AddDataRole,
  GetDataRoles,
  UpdateDataRoles,
} from '../../../../../core/redux';
import { AccountInferface, AddRoleInterface, RoleInterface } from '../../../../../@types';
import { isAuthorization1 } from '../../../../../shared/isLogin';

export default function ViewVaiTro() {
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
      const check = isAuthorization1('1', account, DataRole);
      setCheckAuth(check);
    }
  }, [account, DataRole]);
  //end
  //   const InfoAccount = useAppSelector(state => state.Account.Account);
  //   useEffect(() => {
  //     dispatch(AccountLogin());
  //   }, [dispatch]);

  const [page, setPage] = useState<string>('0');
  const [id, setId] = useState<string>('');

  if (checkAuth) {
    return (
      <>
        {page === '0' ? (
          <DSVaiTro
            HandleClickAddRole={() => setPage('1')}
            HandleClickUpdateRole={(id: string) => {
              setId(id);
              setPage('3');
            }}
          />
        ) : page === '1' ? (
          <ThemVaiTro
            HandleClickCancelAddRole={() => setPage('0')}
            HandleClickOkAddRole={(
              roleName: string,
              describe: string,
              authorization: string[],
              authorization2: string[],
            ) => {
              if (roleName && describe && authorization && authorization2) {
                const newData: AddRoleInterface = {
                  roleName: roleName,
                  describe: describe,
                  authorization: authorization,
                  authorization2: authorization2,
                };
                dispatch(AddDataRole(newData));
                alert('Add success');
                setPage('0');
              } else {
                alert('Erorr add role');
              }
            }}
          />
        ) : (
          <CapNhapVaiTro
            HandleClickCancelUpdateRole={() => setPage('0')}
            HandleClickOkUpdateRole={(
              roleName: string,
              describe: string,
              authorization: string[],
              authorization2: string[],
            ) => {
              if (roleName && describe && authorization && authorization2) {
                const newData: RoleInterface = {
                  key: id,
                  roleName: roleName,
                  describe: describe,
                  authorization: authorization,
                  authorization2: authorization2,
                };
                dispatch(UpdateDataRoles(newData));
                alert('Update success');
                setPage('0');
              } else {
                alert('Erorr update');
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
