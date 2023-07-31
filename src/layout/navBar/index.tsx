import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import './styles.scss';
import { AiFillBell } from 'react-icons/ai';
import { TextNavbarType } from '../../@types';

export default function NavBar(props: TextNavbarType) {
  return (
    <div className="nav-bar position-absolute">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <h4>{props.textLv1}</h4>
          <h4>{props.textLv2}</h4>
          <h4>{props.textLv3}</h4>
        </div>
        <div className="profile-user d-flex align-items-center">
          <div className="bell">
            <AiFillBell />
          </div>
          <div className="me-4">
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size={48} />
          </div>
          <div className="name-user">
            <p>Xin chào</p>
            <h3>Lê Văn Tuấn</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
