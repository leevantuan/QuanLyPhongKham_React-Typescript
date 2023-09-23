import { MdAddBox } from 'react-icons/md';
import './styles.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../shared/hooks/customRedux';
import { DSTaiKhoanInterface } from '../../../../../../@types';
import { ColumnsType } from 'antd/es/table';
import NavBar from '../../../../../../layout/navBar';
import InputSearch from '../../../../../../shared/components/inputSearch';
import CustomTable from '../../../../../../shared/components/table';
import { GoDotFill } from 'react-icons/go';
import { GetAllAccount } from '../../../../../../core/redux/user';
import { GetAllRole } from '../../../../../../core/redux/Role';
import { AccountInferface } from '../../../../../../@types/IUser';

export default function DSTaiKhoan(props: DSTaiKhoanInterface) {
  //colunms daccount
  const columns: ColumnsType<AccountInferface> = [
    {
      key: 'fullName',
      title: 'Họ tên',
      dataIndex: 'fullName',
    },
    {
      key: 'phoneNumber',
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: 'role',
      title: 'Vai trò',
      render: (_, record) =>
        ListRoles.map((role, index) => {
          if (role.key === record.roleId) {
            return <p>{role.roleName}</p>;
          }
          return null;
        }),
    },
    {
      key: 'state',
      title: 'Trạng thái hoạt động',
      render: (_, record) =>
        record.status ? (
          <span className="status-online d-flex active-green">
            <GoDotFill />
            <p>Hoạt động</p>
          </span>
        ) : (
          <span className="status-online d-flex active-red">
            <GoDotFill />
            <p>Ngưng hoạt động</p>
          </span>
        ),
    },

    {
      key: 'update',
      title: '',
      render: (_, record) => (
        <p className="text-link" onClick={() => props.HandleClickUpdateAccount(record.key)}>
          Cập nhập
        </p>
      ),
    },
  ];
  const dispatch = useAppDispatch();
  const ListRoles = useAppSelector(state => state.Role.Roles);
  const ListAccounts = useAppSelector(state => state.Account.Accounts);

  const [inputSearch, setInputSearch] = useState<string>('');
  const [newList, setNewList] = useState<AccountInferface[]>();

  useEffect(() => {
    dispatch(GetAllAccount());
    dispatch(GetAllRole());
  }, [dispatch]);

  //filter data
  useEffect(() => {
    if (ListAccounts.length > 0) {
      const listSort = [...ListAccounts].sort((a, b) => (a.key > b.key ? 1 : -1));
      const newSearchText = listSort.filter(room => room.phoneNumber.includes(inputSearch));
      setNewList(newSearchText);
    }
  }, [inputSearch, ListAccounts]);
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Tài khoản" />
      <div className="content-DS-TaiKhoan">
        <h3>Danh sách tài khoản</h3>
        <div className="navbar-DS-TaiKhoan d-flex ms-4">
          <div className="mt-2">
            <p>Từ khóa</p>
            <InputSearch
              HandleInputSearch={e => setInputSearch(e.target.value)}
              width={400}
              placeholder="Nhập số điện thoại"
            />
          </div>
        </div>
        <div className="list-DS-TaiKhoan m-4 ">
          <CustomTable data={newList} columns={columns} />
        </div>
      </div>
      <div
        className="button-add-account position-absolute d-flex"
        onClick={() => props.HandleClickAddAccount()}
      >
        <MdAddBox />
        <p> Thêm tài khoản</p>
      </div>
    </div>
  );
}
