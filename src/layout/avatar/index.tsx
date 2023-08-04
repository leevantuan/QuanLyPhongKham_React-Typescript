import { Avatar } from 'antd';
import './styles.scss';
import { AiFillBell } from 'react-icons/ai';
import { MyProfileInterface } from '../../@types';
import avatarImg from '../../shared/assets/avatar.png';

export default function MyAvatar(props: MyProfileInterface) {
  return (
    <div className="profile-user d-flex align-items-center">
      <div className="bell" onClick={() => props.HandleClickBell()}>
        <AiFillBell />
      </div>
      <div className="me-4" onClick={() => props.HandleClickMyProfile()}>
        <Avatar src={avatarImg} size={48} />
      </div>
      <div className="name-user" onClick={() => props.HandleClickMyProfile()}>
        <p>Xin chào</p>
        <h3>{props.myFullName}</h3>
      </div>
    </div>
  );
}
