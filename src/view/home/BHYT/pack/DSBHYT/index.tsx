import { useEffect, useState } from 'react';
import NavBar from '../../../../../layout/navBar';
import InputSearch from '../../../../../shared/components/inputSearch';
import CustomTable from '../../../../../shared/components/table';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import './styles.scss';
import { ColumnsType } from 'antd/es/table';
// import { ListRoomInterface } from '../../../../../@types';
import { GoDotFill } from 'react-icons/go';
import { GetAllBHYT } from '../../../../../core/redux/BHYT';
import { BHYTInterface } from '../../../../../@types/IBHYT';
import { ListRoomModelInterface } from '../../../../../@types/IRoom';

export default function DSBHYT(props: ListRoomModelInterface) {
  //colunms BHYT
  const columns: ColumnsType<BHYTInterface> = [
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
  const ListBHYT = useAppSelector(state => state.BHYT.BHYTS);
  useEffect(() => {
    dispatch(GetAllBHYT());
  }, [dispatch]);

  const [inputSearch, setInputSearch] = useState<string>('');
  const [newList, setNewList] = useState<BHYTInterface[]>([]);
  //filter data
  useEffect(() => {
    if (ListBHYT) {
      if (ListBHYT.length > 0) {
        const listSort = [...ListBHYT].sort((a, b) => (a.key > b.key ? 1 : -1));
        const newSearchText = listSort.filter(room => room.phoneNumber.includes(inputSearch));
        setNewList(newSearchText);
      }
    }
  }, [inputSearch, ListBHYT]);

  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Bảo Hiểm Y Tế" />
      <div className="content-DS-BHYT">
        <h3>Danh sách bảo hiểm y tế</h3>
        <div className="navbar-DS-BHYT d-flex ms-4">
          <div className="mt-2">
            <p>Tìm kiếm số điện thoại</p>
            <InputSearch
              HandleInputSearch={e => setInputSearch(e.target.value)}
              width={400}
              placeholder="Nhập số diện điện thoại"
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
