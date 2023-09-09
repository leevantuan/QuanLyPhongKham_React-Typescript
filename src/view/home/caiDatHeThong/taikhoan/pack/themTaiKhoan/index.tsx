import { useEffect, useState } from 'react';
import './styles.scss';
import NavBar from '../../../../../../layout/navBar';
import { AddTaiKhoanInterface } from '../../../../../../@types';
import InputPassword from '../../../../../../shared/components/input/inputPassword';
import { GetDataRoles } from '../../../../../../core/redux';
import { useAppDispatch, useAppSelector } from '../../../../../../shared/hooks/customRedux';

export default function ThemTaiKhoan(props: AddTaiKhoanInterface) {
  const [myFullName, setMyFullName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [role, setRole] = useState<string>('Chọn vai trò');
  const [status, setStatus] = useState<string>('true');
  const [listRole, setListRole] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const ListRoles = useAppSelector(state => state.Role.Role);

  useEffect(() => {
    dispatch(GetDataRoles());
  }, [dispatch]);

  useEffect(() => {
    if (ListRoles) {
      const data = ListRoles.map(role => role.roleName);
      if (data) {
        const defaultList = ['Chọn vai trò'];
        const newList = defaultList.concat(data);
        setListRole(newList);
      }
    }
  }, [ListRoles]);

  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Tài khoản" />
      <div className="content-add-account">
        <h3>Quản lí tài khoản</h3>
        <div className="form-add-account">
          <h5>Thông tin tài khoản</h5>
          <form className="d-flex justify-content-between">
            <div className="col-6">
              <div className="col-12 mb-3">
                <label className="form-label">Họ tên</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập họ tên"
                  onChange={e => setMyFullName(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập số điện thoại"
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập Email"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Vai trò</label>
                <select onChange={e => setRole(e.target.value)}>
                  {listRole.map((role, index) => {
                    return (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-6">
              <div className="col-12 mb-3">
                <label className="form-label">Tên đăng nhập</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên đăng nhập"
                  onChange={e => setUserName(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Mật khẩu</label>
                <InputPassword
                  width={675}
                  height={46}
                  border=""
                  placeholder="Nhập mật khẩu"
                  HandleChangeInput={e => setPassword(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Nhập lại mật khẩu</label>
                <InputPassword
                  width={675}
                  height={46}
                  border=""
                  placeholder="Nhập lại mật khẩu"
                  HandleChangeInput={e => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Tình trạng</label>
                <select onChange={e => setStatus(e.target.value)}>
                  <option value={'true'}>Hoạt động</option>
                  <option value={'false'}>Ngưng hoạt động</option>
                </select>
              </div>
            </div>
          </form>
          <p>Là trường hợp bắt buộc</p>
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={() => props.HandleClickCancelAddAccount()}>Hủy bỏ</button>
          <button
            onClick={() =>
              props.HandleClickOkAddAccount(
                myFullName,
                userName,
                phoneNumber,
                password,
                confirmPassword,
                email,
                role,
                status,
              )
            }
          >
            Thêm tài khoản
          </button>
        </div>
      </div>
    </div>
  );
}
