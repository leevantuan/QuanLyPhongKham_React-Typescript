import { useEffect, useState } from 'react';
import NavBar from '../../../../../layout/navBar';
import './styles.scss';
import { AddDoctorModelInterface } from '../../../../../@types/IDoctor';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import { GetAllRoom } from '../../../../../core/redux/room';
import { RoomsInterface } from '../../../../../@types/IRoom';

export default function ThemBacSi(props: AddDoctorModelInterface) {
  const dispatch = useAppDispatch();
  const AllRoom = useAppSelector(state => state.Room.Rooms);
  useEffect(() => {
    dispatch(GetAllRoom());
  }, [dispatch]);

  const [doctorName, setDoctorName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [dateWork, setDateWork] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [professtional, setProfesstional] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [listRoom, setListRoom] = useState<RoomsInterface[]>([]);

  useEffect(() => {
    const dataRoom = AllRoom.filter(room => room.status === true);
    if (dataRoom) {
      setListRoom(dataRoom);
    }
  }, [AllRoom]);

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
                  placeholder="Nhập tên bác sĩ"
                  onChange={e => setDoctorName(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập số điện thoại"
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
                  placeholder="Nhập ngày sinh"
                  onChange={e => setBirthday(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Ngày vào làm</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ngày vào làm"
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
                  placeholder="Nhập chuyên môn"
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
                  placeholder="Nhập địa chỉ"
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
          <button onClick={() => props.HandleClickCancelAddDoctor()}>Hủy bỏ</button>
          <button onClick={() => props.HandleClickOkAddDoctor()}>Thêm bác sĩ</button>
        </div>
      </div>
    </div>
  );
}
