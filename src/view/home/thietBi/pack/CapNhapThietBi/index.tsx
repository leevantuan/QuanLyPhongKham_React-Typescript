import { useEffect, useState } from 'react';
import { UpdateDeviceInterface } from '../../../../../@types';
import NavBar from '../../../../../layout/navBar';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import './styles.scss';
import { GetDataDevices } from '../../../../../core/redux';
import { IoMdClose } from 'react-icons/io';

export default function CapNhapThietBi(props: UpdateDeviceInterface) {
  const dispatch = useAppDispatch();
  const ListDevices = useAppSelector(state => state.Device.Device);
  //get data device
  useEffect(() => {
    dispatch(GetDataDevices());
  }, [dispatch]);

  const [deviceId, setDeviceId] = useState<string>('');
  const [deviceType, setDeviceType] = useState<string>('');
  const [deviceName, setDeviceName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [addressIP, setAddressIP] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userDevice, setUserDevice] = useState<string>('');
  const [listUserDevice, setListUserDevice] = useState<string[]>([]);

  //index remove
  const [userDeviceRemove, setUserDeviceRemove] = useState<string>('');
  //find device  ,set value
  useEffect(() => {
    if (props.id) {
      const device = ListDevices.find(device => device.key === props.id);
      if (device) {
        setDeviceId(device.deviceId);
        setDeviceType(device.deviceType);
        setDeviceName(device.deviceName);
        setUserName(device.userName);
        setAddressIP(device.addressIP);
        setPassword(device.password);

        const listData = device.userService.split(',');
        setListUserDevice(listData);
      }
    }
  }, [ListDevices, props.id]);
  //remove user device
  useEffect(() => {
    if (userDeviceRemove) {
      const index = listUserDevice.indexOf(userDeviceRemove);
      listUserDevice.splice(index, 1);
    }
    setListUserDevice(listUserDevice);
  }, [userDeviceRemove, listUserDevice]);
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar textLv1="Thiết bị >" textLv2="Danh sách thiết bị >" textLv3="Cập nhập thiết bị" />
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
                  value={deviceId}
                  onChange={e => setDeviceId(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Loại thiết bị</label>
                <br />
                <select value={deviceType} onChange={e => setDeviceType(e.target.value)}>
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
                  value={deviceName}
                  onChange={e => setDeviceName(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Tên đăng nhập</label>
                <input
                  type="text"
                  className="form-control"
                  value={userName}
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
                  value={addressIP}
                  onChange={e => setAddressIP(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Mật khẩu</label>
                <input
                  type="text"
                  className="form-control"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="row col-12">
              <div className="col-12 mb-3">
                <label className="form-label">Dịch vụ sử dụng</label>
                <div className="list-device-user">
                  <ul className="d-flex flex-wrap">
                    {listUserDevice.map((event, index) => {
                      return (
                        <li key={index}>
                          {event}
                          <i
                            onClick={() => {
                              setUserDeviceRemove(event);
                            }}
                          >
                            {' '}
                            <IoMdClose />
                          </i>
                        </li>
                      );
                    })}
                  </ul>
                  <input
                    type="text"
                    className="form-control"
                    onChange={e => setUserDevice(e.target.value)}
                    placeholder="Thêm dịch vụ"
                  />
                </div>
                <p>Là trường hợp thông tin bắt buộc</p>
              </div>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={() => props.HandleClickCancelUpdateDevice()}>Hủy bỏ</button>
          <button
            onClick={() =>
              props.HandleClickOkUpdateDevice(
                deviceId,
                deviceType,
                deviceName,
                userName,
                addressIP,
                password,
                userDevice,
                listUserDevice,
              )
            }
          >
            Cập nhập thiết bị
          </button>
        </div>
      </div>
    </div>
  );
}
