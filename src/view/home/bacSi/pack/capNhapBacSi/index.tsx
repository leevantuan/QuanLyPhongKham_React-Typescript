import { useState } from 'react';
import { AddDeviceInterface } from '../../../../../@types';
import NavBar from '../../../../../layout/navBar';
import './styles.scss';

export default function CapNhapBacSi(props: AddDeviceInterface) {
  const [deviceId, setDeviceId] = useState<string>('');
  const [deviceType, setDeviceType] = useState<string>('');
  const [deviceName, setDeviceName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [addressIP, setAddressIP] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userDevice, setUserDevice] = useState<string>('');
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Bác sĩ" />
      <div className="content-description-doctor">
        <h3>Quản lí bác sĩ</h3>
        <div className="form-description-doctor">
          <h5>Thông tin bác sĩ</h5>
          <form>
            <div className="row col-12">
              <div className="col-6 mb-3">
                <label className="form-label">Mã bác sĩ</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập mã phòng"
                  onChange={e => setDeviceId(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Họ tên</label>
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
                <label className="form-label">Ngày sinh</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên thiết bị"
                  onChange={e => setDeviceName(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Số điện thoại</label>
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
                <label className="form-label">Ngày làm việc</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập địa chỉ IP"
                  onChange={e => setAddressIP(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Chuyên môn</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập địa chỉ IP"
                  onChange={e => setAddressIP(e.target.value)}
                />
              </div>
            </div>
            <div className="row col-12">
              <div className="col-12 mb-3">
                <label className="form-label">Địa chỉ</label>
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
            Cập nhập
          </button>
        </div>
      </div>
    </div>
  );
}
