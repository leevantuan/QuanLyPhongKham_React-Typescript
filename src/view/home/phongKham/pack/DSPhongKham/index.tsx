import { useEffect, useState } from 'react';
import NavBar from '../../../../../layout/navBar';
import InputSearch from '../../../../../shared/components/inputSearch';
import CustomTable from '../../../../../shared/components/table';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import './styles.scss';
import { ColumnsType } from 'antd/es/table';
import { GoDotFill } from 'react-icons/go';
import { GetAllRoom } from '../../../../../core/redux/room';
import { ListRoomModelInterface, RoomsInterface } from '../../../../../@types/IRoom';
import { GetAllService } from '../../../../../core/redux/Service';
import { GetAllDoctor } from '../../../../../core/redux/Doctor';
import { DoctorsInterface } from '../../../../../@types/IDoctor';
import { ServiceInterface } from '../../../../../@types/IService';

export default function DSPhongKham(props: ListRoomModelInterface) {
  //get data room API
  const dispatch = useAppDispatch();
  const ListRooms = useAppSelector(state => state.Room.Rooms);
  const AllDoctor = useAppSelector(state => state.Doctor.Doctors);
  const AllService = useAppSelector(state => state.Service.Services);
  useEffect(() => {
    dispatch(GetAllRoom());
    dispatch(GetAllService());
    dispatch(GetAllDoctor());
  }, [dispatch, props.reset]);

  const [listDataDoctor, setListDataDoctor] = useState<DoctorsInterface[]>([]);
  const [listDataService, setListDataService] = useState<ServiceInterface[]>([]);
  const [inputSearch, setInputSearch] = useState<string>('');
  const [newList, setNewList] = useState<RoomsInterface[]>([]);
  //set data true
  useEffect(() => {
    if (AllDoctor) {
      const filterData = AllDoctor.filter(doctor => doctor.status === true);
      if (filterData) {
        setListDataDoctor(filterData);
      }
    }
  }, [AllDoctor]);
  useEffect(() => {
    if (AllService) {
      const filterData = AllService.filter(service => service.status === true);
      if (filterData) {
        setListDataService(filterData);
      }
    }
  }, [AllService]);

  //filter data
  useEffect(() => {
    if (ListRooms.length > 0) {
      const listSort = [...ListRooms].sort((a, b) => (a.roomName > b.roomName ? 1 : -1));
      const newSearchText = listSort.filter(room => room.roomName.includes(inputSearch));
      setNewList(newSearchText);
    }
  }, [inputSearch, ListRooms]);

  //colunms rooms
  const columns: ColumnsType<RoomsInterface> = [
    {
      key: 'roomName',
      title: 'Số phòng',
      dataIndex: 'roomName',
    },
    {
      title: 'Dịch vụ',
      render: (_, record) =>
        listDataService.map((service, index) => {
          if (service.roomId === record.key) {
            return (
              <p className="mt-1 mb-1" key={index}>
                DV. {service.serviceName}
              </p>
            );
          } else return null;
        }),
    },
    {
      title: 'Bác sĩ',
      render: (_, record) =>
        listDataDoctor.map((doctor, index) => {
          if (doctor.roomId === record.key) {
            return (
              <p className="mt-1 mb-1" key={index}>
                BS. {doctor.doctorName}
              </p>
            );
          } else return null;
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
      key: 'update',
      title: '',
      render: (_, record) => (
        <p className="text-link" onClick={() => props.HandleClickUpdate(record.key)}>
          Cập nhập
        </p>
      ),
    },
  ];

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
    </div>
  );
}
