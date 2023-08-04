import { useEffect, useState } from 'react';
import NavBar from '../../../layout/navBar';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/customRedux';
import './styles.scss';
import { AccountLogin } from '../../../core/redux';
import { AccountInferface } from '../../../@types';
import avatarImg from '../../../shared/assets/avatar.png';

export default function Profile() {
  const dispatch = useAppDispatch();
  const InfoAccount = useAppSelector(state => state.queuing_system.Account);
  useEffect(() => {
    dispatch(AccountLogin());
  }, [dispatch]);

  const [account, setAccount] = useState<AccountInferface>();
  useEffect(() => {
    const token = localStorage.getItem('tokenUser');
    const findAccount = InfoAccount.find(acc => acc.id === token);
    if (findAccount) {
      setAccount(findAccount);
    }
  }, [InfoAccount]);

  return (
    <div className="col-10 d-flex position-relative">
      <NavBar textLv1="" textLv2="" textLv3="Thông tin cá nhân" />
      <div className="my-profile-content d-flex">
        <div>
          <img src={avatarImg} alt="" />
          <h1>{account?.myFullName}</h1>
        </div>
        <div>
          <label>Tên người dùng:</label>
          <br />
          <input value={account?.myFullName} disabled />
          <br />
          <label>Số điện thoại:</label>
          <br />
          <input value={account?.phoneNumber} disabled />
          <br />
          <label>Email</label>
          <br />
          <input value={account?.email} disabled />
        </div>
        <div>
          <label>Tên đăng nhập:</label>
          <br />
          <input value={account?.userName} disabled />
          <br />
          <label>Mật khẩu:</label>
          <br />
          <input value={account?.password} disabled />
          <br />
          <label>Vai trò</label>
          <br />
          <input value={account?.role} disabled />
        </div>
      </div>
    </div>
  );
}
