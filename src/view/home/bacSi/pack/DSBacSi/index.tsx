import { useEffect, useState } from 'react';
import NavBar from '../../../../../layout/navBar';
import InputSearch from '../../../../../shared/components/inputSearch';
import CustomTable from '../../../../../shared/components/table';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import './styles.scss';
import { MdAddBox } from 'react-icons/md';
import { ColumnsType } from 'antd/es/table';
import { ListRoomInterface, DoctorsInterface } from '../../../../../@types';
import { GoDotFill } from 'react-icons/go';
import { GetDataDoctors } from '../../../../../core/redux';

export default function DSBacSi(props: ListRoomInterface) {
  //colunms doctors
  const columns: ColumnsType<DoctorsInterface> = [
    {
      key: 'doctorID',
      title: 'Số thẻ',
      dataIndex: 'doctorID',
    },
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
      key: 'address',
      title: 'Địa chỉ',
      dataIndex: 'address',
    },
    {
      key: 'doctor',
      title: 'Chuyên môn',
      render: (_, record) =>
        record.professional.map((professional, index) => {
          return (
            <p className="mt-1 mb-1" key={index}>
              - {professional}
            </p>
          );
        }),
    },
    {
      key: 'status',
      title: 'Trạng thái làm việc',
      render: (_, record) =>
        record.status ? (
          <span className="status-online d-flex active-green">
            <GoDotFill />
            <p>Còn làm việc</p>
          </span>
        ) : (
          <span className="status-online d-flex active-red">
            <GoDotFill />
            <p>Đã nghỉ việc</p>
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
  //get data doctor
  const dispatch = useAppDispatch();
  const ListDoctors = useAppSelector(state => state.Doctor.Doctor);
  useEffect(() => {
    dispatch(GetDataDoctors());
  }, [dispatch]);

  const [inputSearch, setInputSearch] = useState<string>('');
  const [newList, setNewList] = useState<DoctorsInterface[]>([]);
  //filter data
  //   useEffect(() => {
  //     if (ListRooms.length > 0) {
  //       const listSort = [...ListRooms].sort((a, b) => (a.roomID > b.roomID ? 1 : -1));
  //       const newSearchText = listSort.filter(room => room.roomID.includes(inputSearch));
  //       setNewList(newSearchText);
  //     }
  //   }, [inputSearch, ListRooms]);

  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Bác sĩ" />
      <div className="content-DS-bacSi">
        <h3>Danh sách bác sĩ</h3>
        <div className="navbar-DS-bacSi d-flex ms-4">
          <div className="mt-2">
            <p>Tìm kiếm mã bác sĩ</p>
            <InputSearch
              HandleInputSearch={e => setInputSearch(e.target.value)}
              width={400}
              placeholder="Nhập mã bác sĩ"
            />
          </div>
        </div>
        <div className="list-DS-bacSi m-4 ">
          <CustomTable data={ListDoctors} columns={columns} />
        </div>
      </div>
      <div
        className="button-add-bacSi position-absolute d-flex"
        onClick={() => props.HandleClickAddRoom()}
      >
        <MdAddBox />
        <p> Thêm bác sĩ</p>
      </div>
    </div>
  );
}
