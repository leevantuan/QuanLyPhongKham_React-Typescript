import './styles.scss';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { useEffect, useState } from 'react';
import logoImg from '../../../shared/assets/logo.png';

import { LuLayoutDashboard } from 'react-icons/lu';
import { TbDeviceImac } from 'react-icons/tb';
import { TbBrandWechat } from 'react-icons/tb';
import { TbSettings2 } from 'react-icons/tb';
import Dashboard from '../dashboard';
import ViewPhongKham from '../phongKham/viewPhongKham';
import ViewDichVu from '../dichVu/viewDichVu';
import MyAvatar from '../../../layout/avatar';
import Profile from '../profile';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { isLogin } from '../../../shared/isLogin';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/customRedux';
// import { AccountLogin } from '../../../core/redux';
// import { AccountInferface } from '../../../@types';
import ViewCapSo from '../capSo/viewIndex';
import ViewVaiTro from '../caiDatHeThong/vaitro/viewIndex';
import ViewTaiKhoan from '../caiDatHeThong/taikhoan/viewIndex';
import Bell from '../../../shared/components/bell';
import { GoStack } from 'react-icons/go';
import ViewBacSi from '../bacSi/viewIndex';
import ViewBHYT from '../BHYT/viewIndex';
import DanhSachCapSo from '../DSCapSo';
import { AccountInferface } from '../../../@types/IUser';

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
  getItem('Thống kê', '0', <LuLayoutDashboard />),
  getItem('Phòng Khám', '1', <TbDeviceImac />),
  getItem('Dịch vụ', '2', <TbBrandWechat />),
  getItem('BHYT', '3', <TbBrandWechat />),
  getItem('Cấp số', '4', <GoStack />, [
    getItem('Cấp số mới', '41'),
    getItem('Danh sách cấp số', '42'),
  ]),
  getItem('Bác sĩ', '5', <TbBrandWechat />),
  getItem('Cài đặt hệ thống', '6', <TbSettings2 />, [
    getItem('Quản lý vai trò', '61'),
    getItem('Quản lý tài khoản', '62'),
  ]),
];

export default function ViewIndex() {
  let navigate = useNavigate();
  const [handlePage, setHandlePage] = useState<string>('0');
  const [openBell, setOpenBell] = useState<boolean>(false);
  const [handleActive, setHandleActive] = useState<string>('0');
  const [account, setAccount] = useState<AccountInferface>();
  // const checkIsLogin = isLogin();
  const checkIsLogin = true;
  const dispatch = useAppDispatch();
  const InfoAccount = useAppSelector(state => state.User.User);
  useEffect(() => {
    // dispatch(AccountLogin());
  }, [dispatch]);
  // useEffect(() => {
  //   if (checkIsLogin) {
  //     const findAccount = InfoAccount.find(acc => acc.key === checkIsLogin);
  //     setAccount(findAccount);
  //   }
  // }, [InfoAccount, checkIsLogin]);
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
          {/* <MyAvatar
            HandleClickBell={() => setOpenBell(true)}
            HandleClickMyProfile={() => {
              setHandleActive('20');
              setHandlePage('20');
            }}
            // myFullName={account?.myFullName}
          /> */}
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
          <ViewPhongKham />
        ) : handlePage === '2' ? (
          <ViewDichVu />
        ) : handlePage === '3' ? (
          <ViewBHYT />
        ) : handlePage === '42' ? (
          <DanhSachCapSo />
        ) : handlePage === '41' ? (
          <ViewCapSo />
        ) : handlePage === '5' ? (
          <ViewBacSi />
        ) : handlePage === '61' ? (
          <ViewVaiTro />
        ) : handlePage === '62' ? (
          <ViewTaiKhoan />
        ) : (
          <Profile />
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

        {handlePage === '4' ? (
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
