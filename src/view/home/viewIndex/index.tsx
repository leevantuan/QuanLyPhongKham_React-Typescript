import './styles.scss';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { useEffect, useState } from 'react';
import logoImg from '../../../shared/assets/LogoPng.png';

import { LuLayoutDashboard } from 'react-icons/lu';
import { TbDeviceImac } from 'react-icons/tb';
import { TbBrandWechat } from 'react-icons/tb';
import { TbSettings2 } from 'react-icons/tb';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import Dashboard from '../dashboard';
import ViewThietBi from '../thietBi/viewThietBi';
import ViewDichVu from '../dichVu/viewDichVu';
import MyAvatar from '../../../layout/avatar';
import Profile from '../profile';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isLogin } from '../../../shared/isLogin';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/customRedux';
import { AccountLogin } from '../../../core/redux';
import { AccountInferface } from '../../../@types';
import ViewCapSo from '../capSo/viewIndex';
import ViewVaiTro from '../caiDatHeThong/vaitro/viewIndex';
import ViewTaiKhoan from '../caiDatHeThong/taikhoan/viewIndex';
import ViewNhatKi from '../caiDatHeThong/nhatki';
import Bell from '../../../shared/components/bell';

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
  getItem('Cài đặt hệ thống', '5', <TbSettings2 />, [
    getItem('Quản lý vai trò', '6'),
    getItem('Quản lý tài khoản', '7'),
    getItem('Quản lí người dùng', '8'),
  ]),
];

export default function ViewIndex() {
  let navigate = useNavigate();
  const [handlePage, setHandlePage] = useState<string>('0');
  const [openBell, setOpenBell] = useState<boolean>(false);
  const [handleActive, setHandleActive] = useState<string>('0');
  const [account, setAccount] = useState<AccountInferface>();
  const checkIsLogin = isLogin();
  const dispatch = useAppDispatch();
  const InfoAccount = useAppSelector(state => state.Account.Account);
  useEffect(() => {
    dispatch(AccountLogin());
  }, [dispatch]);
  useEffect(() => {
    if (checkIsLogin) {
      const findAccount = InfoAccount.find(acc => acc.key === checkIsLogin);
      setAccount(findAccount);
    }
  }, [InfoAccount, checkIsLogin]);
  const HanldeClickMenu = ({ item, key, keyPath, selectedKeys, domEvent }: any) => {
    setHandlePage(key);
    setHandleActive(key);
  };
  const HanldeClickLogo = () => {
    setHandlePage('0');
    setHandleActive('0');
  };

  const HandleClickLogout = () => {
    toast.success('Đăng xuất thành công');
    navigate('/', { replace: true });
    localStorage.removeItem('tokenUser');
  };
  if (checkIsLogin) {
    return (
      <div
        className="container-fluid col-12 d-flex position-relative"
        style={{ padding: 0, backgroundColor: '#f6f6f6' }}
      >
        <Bell open={openBell} HandleClickCancel={() => setOpenBell(false)} />
        <div className="my-avatar position-absolute">
          <MyAvatar
            HandleClickBell={() => setOpenBell(true)}
            HandleClickMyProfile={() => {
              setHandleActive('10');
              setHandlePage('10');
            }}
            myFullName={account?.myFullName}
          />
        </div>
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
            <button className="btn-logout " onClick={HandleClickLogout}>
              Đăng xuất
            </button>
          </div>
        </div>

        {/* Router here */}

        {handlePage === '0' ? (
          <Dashboard />
        ) : handlePage === '1' ? (
          <ViewThietBi />
        ) : handlePage === '2' ? (
          <ViewDichVu />
        ) : handlePage === '10' ? (
          <Profile />
        ) : handlePage === '3' ? (
          <ViewCapSo />
        ) : handlePage === '6' ? (
          <ViewVaiTro />
        ) : handlePage === '7' ? (
          <ViewTaiKhoan />
        ) : handlePage === '8' ? (
          <ViewNhatKi />
        ) : (
          ''
        )}
        {/* Router here */}
      </div>
    );
  } else {
    return (
      <div
        className="container-fluid col-12 d-flex position-relative"
        style={{ padding: 0, backgroundColor: '#f6f6f6' }}
      >
        <div className="my-avatar position-absolute">
          <MyAvatar
            HandleClickBell={() => {}}
            HandleClickMyProfile={() => {
              alert('Vui lòng đăng nhập để tiếp tực sử dụng dịch vụ này!');
              navigate('/', { replace: true });
            }}
            myFullName={'Login'}
          />
        </div>
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
            <button className="btn-logout " onClick={HandleClickLogout}>
              Đăng xuất
            </button>
          </div>
        </div>

        {/* Router here */}

        {handlePage === '3' ? (
          <ViewCapSo />
        ) : (
          <div
            style={{
              width: 1000,
              marginTop: 300,
              marginLeft: 300,
              textAlign: 'center',
            }}
          >
            <h1>Vui lòng đăng nhập để tiếp tục sử dụng trang wed</h1>
            <h1
              onClick={() => navigate('/', { replace: true })}
              style={{
                cursor: 'pointer',
                fontWeight: 'bold',
                textDecoration: 'underline',
              }}
            >
              Click để tiếp tục
            </h1>
          </div>
        )}
        {/* Router here */}
      </div>
    );
  }
}
