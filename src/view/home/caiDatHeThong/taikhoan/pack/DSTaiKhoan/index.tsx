import { MdAddBox } from 'react-icons/md';
import './styles.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../shared/hooks/customRedux';
import { AccountInferface, DSTaiKhoanInterface } from '../../../../../../@types';
import { ColumnsType } from 'antd/es/table';
import NavBar from '../../../../../../layout/navBar';
import InputSearch from '../../../../../../shared/components/inputSearch';
import CustomTable from '../../../../../../shared/components/table';
import { AccountLogin, GetDataRoles } from '../../../../../../core/redux';
import CustomSelect from '../../../../../../shared/components/select';
import { GoDotFill } from 'react-icons/go';

export default function DSTaiKhoan(props: DSTaiKhoanInterface) {
  const Count = (countName: string, data: AccountInferface[]) => {
    const listData = data.filter(data => data.role === countName);
    return listData.length;
  };
  //colunms daccount
  const columns: ColumnsType<AccountInferface> = [
    {
      key: 'userName',
      title: 'Tên đăng nhập',
      dataIndex: 'userName',
    },
    {
      key: 'myFullName',
      title: 'Họ tên',
      dataIndex: 'myFullName',
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
      dataIndex: 'role',
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
  const ListRoles = useAppSelector(state => state.Role.Role);
  const ListAccounts = useAppSelector(state => state.Account.Account);

  const [inputSearch, setInputSearch] = useState<string>('');
  const [listRoleName, setListRoleName] = useState<string[]>([]);

  useEffect(() => {
    dispatch(GetDataRoles());
    dispatch(AccountLogin());
  }, [dispatch]);

  useEffect(() => {
    if (ListRoles) {
      const data = ListRoles.map(role => role.roleName);
      if (data) {
        const defaultList = ['Tất cả'];
        const newList = defaultList.concat(data);
        setListRoleName(newList);
      }
    }
  }, [ListRoles]);

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
              placeholder="Nhập từ khóa"
            />
          </div>
        </div>
        <div className="list-DS-TaiKhoan m-4 ">
          <CustomTable data={ListAccounts} columns={columns} />
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
