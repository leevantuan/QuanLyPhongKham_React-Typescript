import { useEffect, useState } from 'react';
import NavBar from '../../../../../layout/navBar';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import './styles.scss';
import { GetAllRoom } from '../../../../../core/redux/room';
import { UpdateModelRoomInterface } from '../../../../../@types/IRoom';

export default function CapNhapPhongKham(props: UpdateModelRoomInterface) {
  const dispatch = useAppDispatch();
  const ListRooms = useAppSelector(state => state.Room.Rooms);
  //get data device
  useEffect(() => {
    dispatch(GetAllRoom());
  }, [dispatch]);

  const [roomId, setRoomId] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  //set data
  useEffect(() => {
    if (props.id) {
      const room = ListRooms.find(room => room.key === props.id);
      if (room) {
        setRoomId(room.key);
        setRoomName(room.roomName);
        const roomToString = room.status.toString();
        setStatus(roomToString);
      }
    }
  }, [ListRooms, props.id]);

  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Phòng Khám" />
      <div className="content-update-room">
        <h3>Quản lí phòng khám</h3>
        <div className="form-update-room">
          <h5>Thông tin phòng khám</h5>
          <form>
            <div className="row col-12">
              <div className="col-6 mb-3">
                <label className="form-label">Mã phòng</label>
                <input type="text" className="form-control" value={roomId} disabled />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Trạng thái</label>
                <br />
                <select value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>
            <div className="row col-12">
              <div className="col-6 mb-3">
                <label className="form-label">Số phòng</label>
                <input
                  type="text"
                  className="form-control"
                  value={roomName}
                  onChange={e => setRoomName(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={() => props.HandleClickCancelUpdateDevice()}>Hủy bỏ</button>
          <button onClick={() => props.HandleClickOkUpdateDevice(roomId, roomName, status)}>
            Cập nhập thiết bị
          </button>
        </div>
      </div>
    </div>
  );
}
