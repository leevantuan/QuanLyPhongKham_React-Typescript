import { useEffect, useState } from 'react';
import NavBar from '../../../../../layout/navBar';
import InputSearch from '../../../../../shared/components/inputSearch';
import CustomTable from '../../../../../shared/components/table';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import './styles.scss';
import { ColumnsType } from 'antd/es/table';
import { ListRoomInterface, BHYTInterface } from '../../../../../@types';
import { GoDotFill } from 'react-icons/go';
import { GetDataBHYT } from '../../../../../core/redux';

export default function DSBHYT(props: ListRoomInterface) {
  //colunms BHYT
  const columns: ColumnsType<BHYTInterface> = [
    {
      key: 'BHYTID',
      title: 'Số thẻ',
      dataIndex: 'BHYTID',
    },
    {
      key: 'fullName',
      title: 'Họ tên',
      dataIndex: 'fullName',
    },
    {
      key: 'birthday',
      title: 'Ngày sinh',
      dataIndex: 'birthday',
    },
    {
      key: 'phoneNumber',
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
    },
    {
      key: 'address',
      title: 'Địa chỉ',
      dataIndex: 'address',
    },
    {
      key: 'status',
      title: 'Trạng thái',
      render: (_, record) =>
        record.status ? (
          <span className="status-online d-flex active-green">
            <GoDotFill />
            <p>Còn sử dụng</p>
          </span>
        ) : (
          <span className="status-online d-flex active-red">
            <GoDotFill />
            <p>Hết hạn</p>
          </span>
        ),
    },
    {
      key: 'description',
      title: '',
      render: (_, record) => (
        <p className="text-link" onClick={() => props.HandleClickDescription(record.key)}>
          Chi tiết
        </p>
      ),
    },
    {
      key: 'update',
      title: '',
      render: (_, record) => (
        <p className="text-link" onClick={() => props.HandleClickUpdate(record.key)}>
          Cập nhập
        </p>
      ),
    },
  ];
  //get data BHYT
  const dispatch = useAppDispatch();
  const ListBHYT = useAppSelector(state => state.BHYT.BHYT);
  useEffect(() => {
    dispatch(GetDataBHYT());
  }, [dispatch]);

  const [inputSearch, setInputSearch] = useState<string>('');
  const [newList, setNewList] = useState<BHYTInterface[]>([]);
  //filter data
  useEffect(() => {
    if (ListBHYT.length > 0) {
      const listSort = [...ListBHYT].sort((a, b) => (a.BHYTID > b.BHYTID ? 1 : -1));
      const newSearchText = listSort.filter(room => room.BHYTID.includes(inputSearch));
      setNewList(newSearchText);
    }
  }, [inputSearch, ListBHYT]);

  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Bảo Hiểm Y Tế" />
      <div className="content-DS-BHYT">
        <h3>Danh sách bảo hiểm y tế</h3>
        <div className="navbar-DS-BHYT d-flex ms-4">
          <div className="mt-2">
            <p>Tìm kiếm mã BHYT</p>
            <InputSearch
              HandleInputSearch={e => setInputSearch(e.target.value)}
              width={400}
              placeholder="Nhập mã BHYT"
            />
          </div>
        </div>
        <div className="list-DS-BHYT m-4 ">
          <CustomTable data={newList} columns={columns} />
        </div>
      </div>
    </div>
  );
}
