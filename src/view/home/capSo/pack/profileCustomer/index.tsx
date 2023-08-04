import { useEffect, useState } from 'react';
import NavBar from '../../../../../layout/navBar';
import './styles.scss';
import { AddProfileCustomerInterface } from '../../../../../@types';

export default function ProfileCustomer(props: AddProfileCustomerInterface) {
  const [customerName, setCustomerName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    setCustomerName(props.customerName);
    setEmail(props.email);
    setPhoneNumber(props.phoneNumber);
  }, [props.customerName, props.email, props.phoneNumber]);

  return (
    <div className="col-10 d-flex position-relative">
      <NavBar textLv1="Cấp số >" textLv2="Danh sách cấp số >" textLv3="Thông tin khách hàng" />
      <div className="content-form-CapSo">
        <h3>Quản lí cấp số</h3>
        <div className="form-CapSo text-center">
          <h1>Thông tin khách hàng</h1>
          <div className="col-12 mb-3 profile-customer">
            <label className="form-label">Tên khách hàng:</label>
            <input
              type="text"
              value={customerName}
              className="form-control"
              placeholder="Nhập tên khách hàng"
              onChange={e => setCustomerName(e.target.value)}
            />
          </div>
          <div className="col-12 mb-3 profile-customer">
            <label className="form-label">Số điện thoại:</label>
            <input
              type="text"
              value={phoneNumber}
              className="form-control"
              placeholder="Nhập số điện thoại"
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="col-12 mb-3 profile-customer">
            <label className="form-label">Email:</label>
            <input
              type="email"
              value={email}
              className="form-control"
              placeholder="Nhập email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button onClick={() => props.HandleClickCancel()}>Hủy bỏ</button>
            <button onClick={() => props.HandleClickContinue(customerName, email, phoneNumber)}>
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
