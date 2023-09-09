import { useState } from 'react';
import { AddDeviceInterface } from '../../../../../@types';
import NavBar from '../../../../../layout/navBar';
import './styles.scss';

export default function ThemPhongKham(props: AddDeviceInterface) {
  const [deviceId, setDeviceId] = useState<string>('');
  const [deviceType, setDeviceType] = useState<string>('');
  const [deviceName, setDeviceName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [addressIP, setAddressIP] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userDevice, setUserDevice] = useState<string>('');
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Phòng Khám" />
      <div className="content-add-room">
        <h3>Quản lí phòng khám</h3>
        <div className="form-add-room">
          <h5>Thông tin phòng khám</h5>
          <form>
            <div className="row col-12">
              <div className="col-6 mb-3">
                <label className="form-label">Mã phòng</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập mã phòng"
                  onChange={e => setDeviceId(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Số phòng</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập số phòng"
                  onChange={e => setDeviceId(e.target.value)}
                />
              </div>
            </div>
            <div className="row col-12">
              <div className="col-6 mb-3">
                <label className="form-label">Dịch vụ</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên thiết bị"
                  onChange={e => setDeviceName(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Bác sĩ trực</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập tài khoản"
                  onChange={e => setUserName(e.target.value)}
                />
              </div>
            </div>
            <div className="row col-12">
              <div className="col-6 mb-3">
                <label className="form-label">Trạng thái</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập địa chỉ IP"
                  onChange={e => setAddressIP(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={() => props.HandleClickCancelAddDevice()}>Hủy bỏ</button>
          <button
            onClick={() =>
              props.HandleClickOkAddDevice(
                deviceId,
                deviceType,
                deviceName,
                userName,
                addressIP,
                password,
                userDevice,
              )
            }
          >
            Thêm thiết bị
          </button>
        </div>
      </div>
    </div>
  );
}