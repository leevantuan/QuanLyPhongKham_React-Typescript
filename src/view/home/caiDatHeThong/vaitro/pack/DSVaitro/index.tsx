import { MdAddBox } from 'react-icons/md';
import './styles.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../shared/hooks/customRedux';
import { AccountInferface, DSVaiTroInterface, RoleInterface } from '../../../../../../@types';
import { ColumnsType } from 'antd/es/table';
import NavBar from '../../../../../../layout/navBar';
import InputSearch from '../../../../../../shared/components/inputSearch';
import CustomTable from '../../../../../../shared/components/table';
import { AccountLogin, GetDataRoles } from '../../../../../../core/redux';

export default function DSVaiTro(props: DSVaiTroInterface) {
  const Count = (countName: string, data: AccountInferface[]) => {
    const listData = data.filter(data => data.role === countName);
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
      render: (_, record) => <p onClick={() => {}}>{Count(record.roleName, ListAccounts)}</p>,
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
  const ListRoles = useAppSelector(state => state.Role.Role);
  const ListAccounts = useAppSelector(state => state.Account.Account);

  const [inputSearch, setInputSearch] = useState<string>('');

  useEffect(() => {
    dispatch(GetDataRoles());
    dispatch(AccountLogin());
  }, [dispatch]);

  return (
    <div className="col-10 d-flex position-relative">
      <NavBar textLv1="Cài đặt hệ thống >" textLv2="" textLv3=" Danh sách vai trò" />
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
          <CustomTable data={ListRoles} columns={columns} />
        </div>
      </div>
      <div
        className="button-add-device position-absolute"
        onClick={() => props.HandleClickAddRole()}
      >
        <MdAddBox />
        <p> Thêm vài trò</p>
      </div>
    </div>
  );
}
