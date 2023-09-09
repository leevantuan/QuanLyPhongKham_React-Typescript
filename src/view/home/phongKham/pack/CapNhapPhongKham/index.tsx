import { useEffect, useState } from 'react';
import { UpdateDeviceInterface } from '../../../../../@types';
import NavBar from '../../../../../layout/navBar';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import './styles.scss';
// import { GetDataDevices } from '../../../../../core/redux';
import { IoMdClose } from 'react-icons/io';

export default function CapNhapPhongKham(props: UpdateDeviceInterface) {
  const dispatch = useAppDispatch();
  // const ListDevices = useAppSelector(state => state.Device.Device);
  //get data device
  useEffect(() => {
    // dispatch(GetDataDevices());
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
  // useEffect(() => {
  //   if (props.id) {
  //     const device = ListDevices.find(device => device.key === props.id);
  //     if (device) {
  //       setDeviceId(device.deviceId);
  //       setDeviceType(device.deviceType);
  //       setDeviceName(device.deviceName);
  //       setUserName(device.userName);
  //       setAddressIP(device.addressIP);
  //       setPassword(device.password);

  //       const listData = device.userService.split(',');
  //       setListUserDevice(listData);
  //     }
  //   }
  // }, [ListDevices, props.id]);
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
      <NavBar text="Phòng Khám" />
      <div className="content-update-room">
        <h3>Quản lí thiết bị</h3>
        <div className="form-update-room">
          <h5>Thông tin thiết bị</h5>
          <form>
            <div className="row col-12">
              <div className="col-6 mb-3">
                <label className="form-label">Mã phòng</label>
                <input
                  type="text"
                  className="form-control"
                  value={deviceId}
                  onChange={e => setDeviceId(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Số phòng</label>
                <br />
                <select value={deviceType} onChange={e => setDeviceType(e.target.value)}>
                  <option value="Kiosk">Kiosk</option>
                  <option value="Display counter">Display counter</option>
                </select>
              </div>
            </div>
            <div className="row col-12">
              <div className="col-6 mb-3">
                <label className="form-label">Dịch vụ</label>
                <input
                  type="text"
                  className="form-control"
                  value={deviceName}
                  onChange={e => setDeviceName(e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Bác sĩ trực</label>
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
                <label className="form-label">Trạng thái</label>
                <input
                  type="text"
                  className="form-control"
                  value={addressIP}
                  onChange={e => setAddressIP(e.target.value)}
                />
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
