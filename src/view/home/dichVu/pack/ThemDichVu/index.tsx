import { useEffect, useState } from 'react';
import NavBar from '../../../../../layout/navBar';
import './styles.scss';
import { AddServiceModelInterface } from '../../../../../@types/IService';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import { GetAllRoom } from '../../../../../core/redux/room';

export default function ThemDichVu(props: AddServiceModelInterface) {
  const dispatch = useAppDispatch();
  const ListRooms = useAppSelector(state => state.Room.Rooms);
  //get data Services
  useEffect(() => {
    dispatch(GetAllRoom());
  }, [dispatch]);

  const [serviceName, setServiceName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');

  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Phòng Khám" />
      <div className="content-update-service">
        <h3>Quản lí dịch vụ</h3>
        <div className="form-update-service">
          <h5>Thông tin dịch vụ</h5>
          <form className="d-flex justify-content-between">
            <div className="col-12">
              <div className="col-12 mb-3">
                <label className="form-label">Mã dịch vụ</label>
                <input type="text" className="form-control" disabled />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Tên dịch vụ</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên dịch vụ"
                  onChange={e => setServiceName(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Trạng thái</label>
                <br />
                <select onChange={e => setStatus(e.target.value)}>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3">
                <label className="form-label">Số phòng</label>
                <br />
                <select onChange={e => setRoomId(e.target.value)}>
                  {ListRooms.map(room => {
                    return (
                      <option value={room.key} key={room.key}>
                        {room.roomName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Giá dịch vụ</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập giá dịch vụ"
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={() => props.HandleClickCancelAddService()}>Hủy bỏ</button>
          <button onClick={() => props.HandleClickOkAddService(serviceName, price, status, roomId)}>
            Thêm dịch vụ
          </button>
        </div>
      </div>
    </div>
  );
}
