import './styles.scss';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { useState } from 'react';
import logoImg from '../../../shared/assets/LogoPng.png';

import { LuLayoutDashboard } from 'react-icons/lu';
import { TbDeviceImac } from 'react-icons/tb';
import { TbBrandWechat } from 'react-icons/tb';
import { TbSettings2 } from 'react-icons/tb';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import Dashboard from '../dashboard';
import ViewThietBi from '../thietBi/viewThietBi';
import ViewDichVu from '../dichVu/viewDichVu';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', '0', <LuLayoutDashboard />),
  getItem('Thiết bị', '1', <TbDeviceImac />),
  getItem('Dịch vụ', '2', <TbBrandWechat />),
  getItem('Cấp số', '3', <TbBrandWechat />),
  getItem('Báo cáo', '4', <HiOutlineDocumentReport />),
  getItem('Cài đặt hệ thống', '5', <TbSettings2 />),
];

export default function ViewIndex() {
  const [handlePage, setHandlePage] = useState<string>('0');
  const [handleActive, setHandleActive] = useState<string>('0');
  const HanldeClickMenu = ({ item, key, keyPath, selectedKeys, domEvent }: any) => {
    setHandlePage(key);
    setHandleActive(key);
  };
  const HanldeClickLogo = () => {
    setHandlePage('0');
    setHandleActive('0');
  };
  return (
    <div
      className="container-fluid col-12 d-flex"
      style={{ padding: 0, backgroundColor: '#f6f6f6' }}
    >
      <div className="col-2 left-dashboard position-relative">
        <img className="logo-view-index" src={logoImg} alt="" onClick={HanldeClickLogo} />
        <Menu
          className="custom-menu"
          selectedKeys={[handleActive]}
          mode="inline"
          items={items}
          onSelect={HanldeClickMenu}
        />
        <div className="d-flex justify-content-center position-absolute">
          <button className="btn-logout ">Đăng xuất</button>
        </div>
      </div>

      {/* Router here */}

      {handlePage === '0' ? (
        <Dashboard />
      ) : handlePage === '1' ? (
        <ViewThietBi />
      ) : handlePage === '2' ? (
        <ViewDichVu />
      ) : (
        ''
      )}

      {/* Router here */}
    </div>
  );
}
