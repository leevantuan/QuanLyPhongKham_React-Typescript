import { useEffect, useState } from 'react';
import NavBar from '../../../../../layout/navBar';
import './styles.scss';
import { UpdateDoctorModelInterface } from '../../../../../@types/IDoctor';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import { GetAllDoctor } from '../../../../../core/redux/Doctor';
import { GetAllRoom } from '../../../../../core/redux/room';
import { RoomsInterface } from '../../../../../@types/IRoom';

export default function CapNhapBacSi(props: UpdateDoctorModelInterface) {
  const dispatch = useAppDispatch();
  const ListDoctor = useAppSelector(state => state.Doctor.Doctors);
  const AllRoom = useAppSelector(state => state.Room.Rooms);
  useEffect(() => {
    dispatch(GetAllDoctor());
    dispatch(GetAllRoom());
  }, [dispatch]);

  const [doctorId, setDoctorId] = useState<string>('');
  const [doctorName, setDoctorName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [dateWork, setDateWork] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [professtional, setProfesstional] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [listRoom, setListRoom] = useState<RoomsInterface[]>([]);

  //set data
  useEffect(() => {
    const dataRoom = AllRoom.filter(room => room.status === true);
    if (dataRoom) {
      setListRoom(dataRoom);
    }

    if (props.id) {
      const setData = ListDoctor.find(doctor => doctor.key === props.id);
      if (setData) {
        setDoctorId(setData.key);
        setDoctorName(setData.doctorName);
        setPhoneNumber(setData.phoneNumber);
        setBirthday(setData.birthDay);
        setDateWork(setData.dateWork);
        setAddress(setData.address);
        setProfesstional(setData.professtional);
        setRoomId(setData.roomId);
        const Status = setData.status.toString();
        setStatus(Status);
      }
    }
  }, [AllRoom, props.id, ListDoctor]);
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Bác sĩ" />
      <div className="content-update-doctor">
        <h3>Quản lí bác sĩ</h3>
        <div className="form-update-doctor">
          <h5>Thông tin bác sĩ</h5>
          <form>
            <div className="row col-12">
              <div className="col-6 mb-3">
                <label className="form-label">Tên bác sĩ</label>
                <input
                  type="text"
                  className="form-control"
                  value={doctorName}
                  onChange={e => setDoctorName(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="row col-12">
              <div className="col-6 mb-3">
                <label className="form-label">Ngày sinh</label>
                <input
                  type="text"
                  className="form-control"
                  value={birthday}
                  onChange={e => setBirthday(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Ngày vào làm</label>
                <input
                  type="text"
                  className="form-control"
                  value={dateWork}
                  onChange={e => setDateWork(e.target.value)}
                />
              </div>
            </div>
            <div className="row col-12">
              <div className="col-6 mb-3">
                <label className="form-label">Chuyên môn</label>
                <input
                  type="text"
                  className="form-control"
                  value={professtional}
                  onChange={e => setProfesstional(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Phòng làm việc</label>
                <br />
                <select value={status} onChange={e => setStatus(e.target.value)}>
                  {listRoom.map(room => {
                    return (
                      <option value={room.key} key={room.key}>
                        {room.roomName}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="row col-12">
              <div className="col-6 mb-3">
                <label className="form-label">Địa chỉ</label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Trạng thái làm việc</label>
                <br />
                <select value={roomId} onChange={e => setRoomId(e.target.value)}>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={() => props.HandleClickCancelUpdateDoctor()}>Hủy bỏ</button>
          <button onClick={() => props.HandleClickOkUpdateDoctor()}>Cập nhập</button>
        </div>
      </div>
    </div>
  );
}
