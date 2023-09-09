import { useState } from 'react';
import { AddDeviceInterface } from '../../../../../@types';
import NavBar from '../../../../../layout/navBar';
import './styles.scss';

export default function CapNhapBHYT(props: AddDeviceInterface) {
  const [deviceId, setDeviceId] = useState<string>('');
  const [deviceType, setDeviceType] = useState<string>('');
  const [deviceName, setDeviceName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [addressIP, setAddressIP] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userDevice, setUserDevice] = useState<string>('');
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Bảo hiểm y tế" />
      <div className="content-description-doctor">
        <h3>Quản lí BHYT</h3>
        <div className="form-description-doctor">
          <h5>Thông tin BHYT</h5>
          <form>
            <div className="row col-12">
              <div className="col-6 mb-3">
                <label className="form-label">Mã BHYT</label>
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
                <label className="form-label">Ngày Cấp</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập địa chỉ IP"
                  onChange={e => setAddressIP(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Hạn sử dụng</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập địa chỉ IP"
                  onChange={e => setAddressIP(e.target.value)}
                />
              </div>
            </div>
            <div className="row col-12">
              <div className="col-6 mb-3">
                <label className="form-label">Địa chỉ</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập địa chỉ IP"
                  onChange={e => setAddressIP(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Nghề nghiệp</label>
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
