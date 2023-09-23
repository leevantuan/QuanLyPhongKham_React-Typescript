import { useEffect, useState } from 'react';
import NavBar from '../../../../../layout/navBar';
import './styles.scss';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import { UpdateServiceModelInterface } from '../../../../../@types/IService';
import { GetAllService } from '../../../../../core/redux/Service';
import { GetAllRoom } from '../../../../../core/redux/room';

export default function CapNhapDichVu(props: UpdateServiceModelInterface) {
  const dispatch = useAppDispatch();
  const ListServices = useAppSelector(state => state.Service.Services);
  const ListRooms = useAppSelector(state => state.Room.Rooms);
  //get data Services
  useEffect(() => {
    dispatch(GetAllService());
    dispatch(GetAllRoom());
  }, [dispatch]);

  const [serviceId, setServiceId] = useState<string>('');
  const [serviceName, setServiceName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');

  //set data
  useEffect(() => {
    if (props.id) {
      const service = ListServices.find(ser => ser.key === props.id);
      if (service) {
        setServiceId(service.key);
        setServiceName(service.serviceName);
        setPrice(service.price);
        setRoomId(service.roomId);
        const serviceToString = service.status.toString();
        setStatus(serviceToString);
      }
    }
  }, [ListServices, props.id]);

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
                <input type="text" className="form-control" value={serviceId} disabled />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Tên dịch vụ</label>
                <input
                  type="text"
                  className="form-control"
                  value={serviceName}
                  onChange={e => setServiceName(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Trạng thái</label>
                <br />
                <select value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3">
                <label className="form-label">Số phòng</label>
                <br />
                <select value={roomId} onChange={e => setRoomId(e.target.value)}>
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
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={() => props.HandleClickCancelUpdateService()}>Hủy bỏ</button>
          <button
            onClick={() =>
              props.HandleClickOkUpdateService(serviceId, serviceName, price, status, roomId)
            }
          >
            Cập nhập dịch vụ
          </button>
        </div>
      </div>
    </div>
  );
}
