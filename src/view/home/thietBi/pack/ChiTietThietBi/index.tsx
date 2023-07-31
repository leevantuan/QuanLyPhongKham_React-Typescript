import { useEffect, useState } from 'react';
import { DescriptionDeviceInterface, DeviceInterface } from '../../../../../@types';
import NavBar from '../../../../../layout/navBar';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import './styles.scss';
import { GetDataDevices } from '../../../../../core/redux';
import { MdEditSquare } from 'react-icons/md';

export default function ChiTietThietBi(props: DescriptionDeviceInterface) {
  const dispatch = useAppDispatch();
  const ListDevices = useAppSelector(state => state.queuing_system.Device);
  //get data device
  useEffect(() => {
    dispatch(GetDataDevices());
  }, [dispatch]);

  const [device, setDevice] = useState<DeviceInterface[]>([]);
  //find device
  useEffect(() => {
    if (props.id) {
      const device = ListDevices.filter(device => device.key === props.id);
      setDevice(device);
    }
  }, [ListDevices, props.id]);
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar textLv1="Thiết bị >" textLv2="Danh sách thiết bị >" textLv3="Chi tiết thiết bị" />
      <div className="content-description-device">
        <h3>Quản lí thiết bị</h3>
        <div className="form-chi-tiet-thiet-bi">
          <h5>Thông tin thiết bị</h5>
          {device.map(device => {
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
          })}
        </div>
      </div>
      <div
        className="button-update-device position-absolute"
        onClick={() => props.HandleClickUpdateDevice(props.id)}
      >
        <MdEditSquare />
        <p> Cập nhập thiết bị</p>
      </div>
    </div>
  );
}
