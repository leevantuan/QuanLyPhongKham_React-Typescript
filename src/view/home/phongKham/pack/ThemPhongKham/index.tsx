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
      <div className="content-add-device">
        <h3>Quản lí thiết bị</h3>
        <div className="form-add-device">
          <h5>Thông tin thiết bị</h5>
          <form>
            <div className="row col-12">
              <div className="col-6 mb-3">
                <label className="form-label">Mã thiết bị</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập mã thiết bị"
                  onChange={e => setDeviceId(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Loại thiết bị</label>
                <br />
                <select onChange={e => setDeviceType(e.target.value)}>
                  <option value="Kiosk">Kiosk</option>
                  <option value="Display counter">Display counter</option>
                </select>
              </div>
            </div>
            <div className="row col-12">
              <div className="col-6 mb-3">
                <label className="form-label">Tên thiết bị</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên thiết bị"
                  onChange={e => setDeviceName(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Tên đăng nhập</label>
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
                <label className="form-label">Địa chỉ IP</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập địa chỉ IP"
                  onChange={e => setAddressIP(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Mật khẩu</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập mật khẩu"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="row col-12">
              <div className="col-12 mb-3">
                <label className="form-label">Dịch vụ sử dụng</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập dịch vụ sử dụng"
                  onChange={e => setUserDevice(e.target.value)}
                />
                <p>Là trường hợp thông tin bắt buộc</p>
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
