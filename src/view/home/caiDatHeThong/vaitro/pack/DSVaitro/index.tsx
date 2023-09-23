import { MdAddBox } from 'react-icons/md';
import './styles.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../shared/hooks/customRedux';
import { DSVaiTroInterface } from '../../../../../../@types';
import { ColumnsType } from 'antd/es/table';
import NavBar from '../../../../../../layout/navBar';
import InputSearch from '../../../../../../shared/components/inputSearch';
import CustomTable from '../../../../../../shared/components/table';
import { RoleInterface } from '../../../../../../@types/IRole';
import { GetAllRole } from '../../../../../../core/redux/Role';
import { AccountInferface } from '../../../../../../@types/IUser';
import { GetAllAccount } from '../../../../../../core/redux/user';

export default function DSVaiTro(props: DSVaiTroInterface) {
  const Count = (key: string, data: AccountInferface[]) => {
    const listData = data.filter(data => data.roleId === key);
    return listData.length;
  };
  //colunms device
  const columns: ColumnsType<RoleInterface> = [
    {
      key: 'roleName',
      title: 'Tên vai trò',
      dataIndex: 'roleName',
    },
    {
      key: 'count',
      title: 'Số người dùng',
      render: (_, record) => <p>{Count(record.key, ListAccounts)}</p>,
    },
    {
      key: 'describe',
      title: 'Mô tả',
      dataIndex: 'describe',
    },

    {
      key: 'update',
      title: '',
      render: (_, record) => (
        <p className="text-link" onClick={() => props.HandleClickUpdateRole(record.key)}>
          Cập nhập
        </p>
      ),
    },
  ];
  const dispatch = useAppDispatch();
  const ListRoles = useAppSelector(state => state.Role.Roles);
  const ListAccounts = useAppSelector(state => state.Account.Accounts);

  const [inputSearch, setInputSearch] = useState<string>('');
  const [newList, setNewList] = useState<RoleInterface[]>();

  useEffect(() => {
    dispatch(GetAllRole());
    dispatch(GetAllAccount());
  }, [dispatch]);

  //filter data
  useEffect(() => {
    if (ListRoles.length > 0) {
      const listSort = [...ListRoles].sort((a, b) => (a.key > b.key ? 1 : -1));
      const newSearchText = listSort.filter(room => room.roleName.includes(inputSearch));
      setNewList(newSearchText);
    }
  }, [inputSearch, ListRoles]);

  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Vai trò" />
      <div className="content-DS-VaiTro">
        <h3>Quản lí Vai trò</h3>
        <div className="navbar-DS-VaiTro d-flex ms-4">
          <div className="mt-2">
            <p>Từ khóa</p>
            <InputSearch
              HandleInputSearch={e => setInputSearch(e.target.value)}
              width={400}
              placeholder="Nhập từ khóa"
            />
          </div>
        </div>
        <div className="list-DS-VaiTro m-4 ">
          <CustomTable data={newList} columns={columns} />
        </div>
      </div>
      <div
        className="button-add-role position-absolute d-flex"
        onClick={() => props.HandleClickAddRole()}
      >
        <MdAddBox />
        <p> Thêm vai trò</p>
      </div>
    </div>
  );
}
