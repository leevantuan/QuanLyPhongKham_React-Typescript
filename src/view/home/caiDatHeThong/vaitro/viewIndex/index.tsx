import { useState } from 'react';
import DSVaiTro from '../pack/DSVaitro';
import ThemVaiTro from '../pack/themVaiTro';
import CapNhapVaiTro from '../pack/CapNhapVaiTro';
import { useAppDispatch } from '../../../../../shared/hooks/customRedux';
import { AddDataRole, UpdateDataRoles } from '../../../../../core/redux';
import { AddRoleInterface, RoleInterface } from '../../../../../@types';

export default function ViewVaiTro() {
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
}
