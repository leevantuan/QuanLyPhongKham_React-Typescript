import { useEffect, useState } from 'react';
import NavBar from '../../../../../layout/navBar';
import InputSearch from '../../../../../shared/components/inputSearch';
import CustomTable from '../../../../../shared/components/table';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import './styles.scss';
import { MdAddBox } from 'react-icons/md';
import { ColumnsType } from 'antd/es/table';
import { ListRoomInterface, RoomsInterface } from '../../../../../@types';
import { GoDotFill } from 'react-icons/go';
import { GetDataRooms } from '../../../../../core/redux';

export default function DSPhongKham(props: ListRoomInterface) {
  //colunms rooms
  const columns: ColumnsType<RoomsInterface> = [
    {
      key: 'roomID',
      title: 'Mã phòng',
      dataIndex: 'roomID',
    },
    {
      key: 'roomID',
      title: 'Số phòng',
      dataIndex: 'roomID',
    },
    {
      key: 'service',
      title: 'Dịch vụ',
      render: (_, record) =>
        record.service.map((service, index) => {
          return (
            <p className="mt-1 mb-1" key={index}>
              - {service}
            </p>
          );
        }),
    },
    {
      key: 'doctor',
      title: 'Bác sĩ',
      render: (_, record) =>
        record.doctor.map((doctor, index) => {
          return (
            <p className="mt-1 mb-1" key={index}>
              BS. {doctor}
            </p>
          );
        }),
    },
    {
      key: 'status',
      title: 'Trạng thái sử dụng',
      render: (_, record) =>
        record.status ? (
          <span className="status-online d-flex active-green">
            <GoDotFill />
            <p>Còn sử dụng</p>
          </span>
        ) : (
          <span className="status-online d-flex active-red">
            <GoDotFill />
            <p>Không sử dụng</p>
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
  //get data device
  const dispatch = useAppDispatch();
  const ListRooms = useAppSelector(state => state.Room.Room);
  useEffect(() => {
    dispatch(GetDataRooms());
  }, [dispatch]);

  const [inputSearch, setInputSearch] = useState<string>('');
  const [newList, setNewList] = useState<RoomsInterface[]>([]);
  //filter data
  useEffect(() => {
    if (ListRooms.length > 0) {
      const listSort = [...ListRooms].sort((a, b) => (a.roomID > b.roomID ? 1 : -1));
      const newSearchText = listSort.filter(room => room.roomID.includes(inputSearch));
      setNewList(newSearchText);
    }
  }, [inputSearch, ListRooms]);

  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Phòng Khám" />
      <div className="content-DS-phongKham">
        <h3>Danh sách phòng khám</h3>
        <div className="navbar-DS-phongKham d-flex ms-4">
          <div className="mt-2">
            <p>Tìm kiếm số phòng</p>
            <InputSearch
              HandleInputSearch={e => setInputSearch(e.target.value)}
              width={400}
              placeholder="Nhập số phòng"
            />
          </div>
        </div>
        <div className="list-DS-phongKham m-4 ">
          <CustomTable data={newList} columns={columns} />
        </div>
      </div>
      <div
        className="button-add-room position-absolute d-flex"
        onClick={() => props.HandleClickAddRoom()}
      >
        <MdAddBox />
        <p> Thêm phòng khám</p>
      </div>
    </div>
  );
}
