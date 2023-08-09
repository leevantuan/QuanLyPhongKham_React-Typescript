import { useEffect, useState } from 'react';
import './styles.scss';
import NavBar from '../../../../../../layout/navBar';
import { UpdateTaiKhoanInterface } from '../../../../../../@types';
import InputPassword from '../../../../../../shared/components/input/inputPassword';
import { useAppDispatch, useAppSelector } from '../../../../../../shared/hooks/customRedux';
import { AccountLogin, GetDataRoles } from '../../../../../../core/redux';

export default function CapNhapTaiKhoan(props: UpdateTaiKhoanInterface) {
  const [myFullName, setMyFullName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [status, setStatus] = useState<string>('true');

  const dispatch = useAppDispatch();
  const ListRoles = useAppSelector(state => state.Role.Role);
  const ListAccounts = useAppSelector(state => state.Account.Account);

  const [listRole, setListRole] = useState<string[]>([]);

  useEffect(() => {
    dispatch(GetDataRoles());
    dispatch(AccountLogin());
  }, [dispatch]);

  useEffect(() => {
    if (props.id) {
      const account = ListAccounts.find(acc => acc.key === props.id);
      if (account) {
        setMyFullName(account.myFullName);
        setUserName(account.userName);
        setPhoneNumber(account.phoneNumber);
        setEmail(account.email);
        setRole(account.role);
        if (account.status === true) {
          setStatus('true');
        } else {
          setStatus('false');
        }
      }
    }
  }, [props.id, ListAccounts]);

  useEffect(() => {
    if (ListRoles) {
      const data = ListRoles.map(role => role.roleName);
      setListRole(data);
    }
  }, [ListRoles]);
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar
        textLv1="Quản lý hệ thống >"
        textLv2="Quản lí tài khoản >"
        textLv3="Cập nhập tài khoản"
      />
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
                  value={myFullName}
                  onChange={e => setMyFullName(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Vai trò</label>
                <select onChange={e => setRole(e.target.value)} value={role}>
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
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Mật khẩu mới</label>
                <InputPassword
                  width={700}
                  height={46}
                  border=""
                  placeholder="Nhập mật khẩu mới"
                  HandleChangeInput={e => setPassword(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Nhập lại mật khẩu</label>
                <InputPassword
                  width={700}
                  height={46}
                  border=""
                  placeholder="Nhập lại mật khẩu"
                  HandleChangeInput={e => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Tình trạng</label>
                <select onChange={e => setStatus(e.target.value)} value={status}>
                  <option value={'true'}>Hoạt động</option>
                  <option value={'false'}>Ngưng hoạt động</option>
                </select>
              </div>
            </div>
          </form>
          <p>Là trường hợp bắt buộc</p>
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={() => props.HandleClickCancelUpdateAccount()}>Hủy bỏ</button>
          <button
            onClick={() =>
              props.HandleClickOkUpdateAccount(
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
            Cập nhập tài khoản
          </button>
        </div>
      </div>
    </div>
  );
}
