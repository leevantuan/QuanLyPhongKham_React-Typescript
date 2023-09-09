import { useEffect, useState } from 'react';
import { DescriptionRoomInterface, RoomsInterface } from '../../../../../@types';
import NavBar from '../../../../../layout/navBar';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import './styles.scss';
import { MdEditSquare } from 'react-icons/md';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { GetDataRooms } from '../../../../../core/redux';

export default function ChiTietBHYT(props: DescriptionRoomInterface) {
  const dispatch = useAppDispatch();
  const ListRooms = useAppSelector(state => state.Room.Room);
  //get data room
  useEffect(() => {
    dispatch(GetDataRooms());
  }, [dispatch]);

  const [rooms, setRooms] = useState<RoomsInterface[]>([]);
  //find room
  useEffect(() => {
    if (props.id) {
      const room = ListRooms.filter(room => room.key === props.id);
      setRooms(room);
    }
  }, [props.id, ListRooms]);
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Bảo hiểm y tế" />
      <div className="content-description-BHYT">
        <h3>Chi tiết BHYT</h3>
        <div className="form-chi-tiet-BHYT">
          <h5>Thông tin BHYT</h5>
          {/* {device.map(device => {
            return (
              <div key={device.key}>
                <div className="d-flex">
                  <div className="d-flex">
                    <label>Mã thiết bị:</label>
                    <p>{device?.deviceId}</p>
                  </div>
                  <div className="d-flex">
                    <label>Loại thiết bị:</label>
                    <p>{device?.deviceType}</p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="d-flex">
                    <label>Tên thiết bị:</label>
                    <p>{device?.deviceName}</p>
                  </div>
                  <div className="d-flex">
                    <label>Tên đăng nhập:</label>
                    <p>{device?.userName}</p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="d-flex">
                    <label>Địa chỉ IP:</label>
                    <p>{device?.addressIP}</p>
                  </div>
                  <div className="d-flex">
                    <label>Mật Khẩu:</label>
                    <p>{device?.password}</p>
                  </div>
                </div>
                <div>
                  <label>Dịch vụ sử dụng:</label>
                  <p>{device?.userService}</p>
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
      <div
        className="button-update-BHYT position-absolute"
        onClick={() => props.HandleClickUpdateRoom(props.id)}
      >
        <MdEditSquare />
        <p>Cập nhập</p>
      </div>
      <div
        className="button-goback-BHYT position-absolute"
        onClick={() => props.HandleClickGoBackRoom()}
      >
        <RiArrowGoBackFill />
        <p>Quay lại</p>
      </div>
    </div>
  );
}
