import { useEffect, useState } from 'react';
import NavBar from '../../../../../layout/navBar';
import InputSearch from '../../../../../shared/components/inputSearch';
import CustomTable from '../../../../../shared/components/table';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import './styles.scss';
import { MdAddBox } from 'react-icons/md';
import { ColumnsType } from 'antd/es/table';
import { GoDotFill } from 'react-icons/go';
import { DoctorsInterface } from '../../../../../@types/IDoctor';
import { GetAllDoctor } from '../../../../../core/redux/Doctor';
import { ListRoomModelInterface } from '../../../../../@types/IRoom';

export default function DSBacSi(props: ListRoomModelInterface) {
  //colunms doctors
  const columns: ColumnsType<DoctorsInterface> = [
    {
      key: 'doctorName',
      title: 'Họ tên',
      dataIndex: 'doctorName',
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
      key: 'professtional',
      title: 'Chuyên môn',
      dataIndex: 'professtional',
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
            <p>Nghỉ phép</p>
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
  const ListDoctors = useAppSelector(state => state.Doctor.Doctors);
  useEffect(() => {
    dispatch(GetAllDoctor());
  }, [dispatch]);

  const [inputSearch, setInputSearch] = useState<string>('');
  const [newList, setNewList] = useState<DoctorsInterface[]>([]);
  //filter data
  useEffect(() => {
    if (ListDoctors.length > 0) {
      const listSort = [...ListDoctors].sort((a, b) => (a.key > b.key ? 1 : -1));
      const newSearchText = listSort.filter(room => room.doctorName.includes(inputSearch));
      setNewList(newSearchText);
    }
  }, [inputSearch, ListDoctors]);

  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Bác sĩ" />
      <div className="content-DS-bacSi">
        <h3>Danh sách bác sĩ</h3>
        <div className="navbar-DS-bacSi d-flex ms-4">
          <div className="mt-2">
            <p>Tìm kiếm bác sĩ</p>
            <InputSearch
              HandleInputSearch={e => setInputSearch(e.target.value)}
              width={400}
              placeholder="Nhập tên bác sĩ"
            />
          </div>
        </div>
        <div className="list-DS-bacSi m-4 ">
          <CustomTable data={newList} columns={columns} />
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
