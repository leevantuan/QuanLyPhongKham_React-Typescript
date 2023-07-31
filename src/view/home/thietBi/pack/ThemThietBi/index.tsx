import { CancelAddDeviceInterface } from '../../../../../@types';
import NavBar from '../../../../../layout/navBar';
import './styles.scss';

export default function ThemThietBi(props: CancelAddDeviceInterface) {
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar textLv1="Thiết bị >" textLv2="Danh sách thiết bị >" textLv3="Thêm thiết bị" />
      <div className="content-add-device">
        <h3>Quản lí thiết bị</h3>
        <div className="form-add-device">
          <h5>Thông tin thiết bị</h5>
          <form>
            <div className="row col-12">
              <div className="col-6 mb-3">
                <label className="form-label">Mã thiết bị</label>
                <input type="text" className="form-control" placeholder="Nhập mã thiết bị" />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Loại thiết bị</label>
                <br />
                <select>
                  <option value="Kiosk">Kiosk</option>
                  <option value="Display counter">Display counter</option>
                </select>
              </div>
            </div>
            <div className="row col-12">
              <div className="col-6 mb-3">
                <label className="form-label">Tên thiết bị</label>
                <input type="text" className="form-control" placeholder="Nhập tên thiết bị" />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Tên đăng nhập</label>
                <input type="text" className="form-control" placeholder="Nhập tài khoản" />
              </div>
            </div>
            <div className="row col-12">
              <div className="col-6 mb-3">
                <label className="form-label">Địa chỉ IP</label>
                <input type="text" className="form-control" placeholder="Nhập địa chỉ IP" />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Mật khẩu</label>
                <input type="text" className="form-control" placeholder="Nhập mật khẩu" />
              </div>
            </div>
            <div className="row col-12">
              <div className="col-12 mb-3">
                <label className="form-label">Dịch vụ sử dụng</label>
                <input type="text" className="form-control" placeholder="Nhập dịch vụ sử dụng" />
                <p>Là trường hợp thông tin bắt buộc</p>
              </div>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={() => props.HandleClickCancelAddDevice()}>Hủy bỏ</button>
          <button onClick={() => props.HandleClickOkAddDevice()}>Thêm thiết bị</button>
        </div>
      </div>
    </div>
  );
}
