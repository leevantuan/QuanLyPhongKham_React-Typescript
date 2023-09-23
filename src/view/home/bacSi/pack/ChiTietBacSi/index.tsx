import { useEffect, useState } from 'react';
import { DescriptionRoomInterface } from '../../../../../@types';
import NavBar from '../../../../../layout/navBar';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import './styles.scss';
import { MdEditSquare } from 'react-icons/md';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { GetAllDoctor } from '../../../../../core/redux/Doctor';
import { DoctorsInterface } from '../../../../../@types/IDoctor';
import { GetAllRoom } from '../../../../../core/redux/room';

export default function ChiTietBacSi(props: DescriptionRoomInterface) {
  const dispatch = useAppDispatch();
  const ListDoctor = useAppSelector(state => state.Doctor.Doctors);
  const ListRoom = useAppSelector(state => state.Room.Rooms);
  useEffect(() => {
    dispatch(GetAllDoctor());
    dispatch(GetAllRoom());
  }, [dispatch]);

  const [doctor, setDoctor] = useState<DoctorsInterface[]>([]);
  const [room, setRoom] = useState<string>('');
  // find room
  useEffect(() => {
    if (props.id) {
      const doctor = ListDoctor.filter(doctor => doctor.key === props.id);
      if (doctor) {
        setDoctor(doctor);
      }
    }
  }, [props.id, ListDoctor]);
  useEffect(() => {
    if (props.id) {
      const doctor = ListDoctor.find(doctor => doctor.key === props.id);
      if (doctor) {
        const findRoom = ListRoom.find(room => room.key === doctor.roomId);
        if (findRoom) {
          setRoom(findRoom.roomName);
        }
      }
    }
  }, [props.id, ListDoctor, ListRoom]);

  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Bác sĩ" />
      <div className="content-description-room">
        <h3>Chi tiết bác sĩ</h3>
        <div className="form-chi-tiet-room">
          <h5 className="pb-4">Thông tin bác sĩ</h5>
          {doctor.map(doctor => {
            return (
              <div key={doctor.key}>
                <div className="d-flex">
                  <div className="d-flex">
                    <label>Tên bác sĩ:</label>
                    <p>{doctor?.doctorName}</p>
                  </div>
                  <div className="d-flex">
                    <label>Số điện thoại:</label>
                    <p>{doctor?.phoneNumber}</p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="d-flex">
                    <label>Ngày sinh:</label>
                    <p>{doctor?.birthDay}</p>
                  </div>
                  <div className="d-flex">
                    <label>Địa chỉ:</label>
                    <p>{doctor?.address}</p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="d-flex">
                    <label>Chuyên môn:</label>
                    <p>{doctor?.professtional}</p>
                  </div>
                  <div className="d-flex">
                    <label>Ngày vào làm:</label>
                    <p>{doctor?.dateWork}</p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="d-flex">
                    <label>Trạng thái:</label>
                    <p>{doctor?.status === true ? 'Đang làm việc' : 'Đang nghỉ phép'}</p>
                  </div>
                  <div className="d-flex">
                    <label>Phòng làm việc:</label>
                    <p>{room}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="button-update-room position-absolute"
        onClick={() => props.HandleClickUpdateRoom(props.id)}
      >
        <MdEditSquare />
        <p>Cập nhập</p>
      </div>
      <div
        className="button-goback-room position-absolute"
        onClick={() => props.HandleClickGoBackRoom()}
      >
        <RiArrowGoBackFill />
        <p>Quay lại</p>
      </div>
    </div>
  );
}
