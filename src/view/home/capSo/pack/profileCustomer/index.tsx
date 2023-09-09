import { useEffect, useState } from 'react';
import NavBar from '../../../../../layout/navBar';
import './styles.scss';
import { AddProfileCustomerInterface } from '../../../../../@types';

export default function ProfileCustomer(props: AddProfileCustomerInterface) {
  const [customerName, setCustomerName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [BHYT, setBHYT] = useState<boolean>(true);

  useEffect(() => {
    setCustomerName(props.customerName);
    setEmail(props.email);
    setPhoneNumber(props.phoneNumber);
  }, [props.customerName, props.email, props.phoneNumber]);

  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Cấp Số" />
      <div className="content-form-CapSo">
        <h3>Cấp số mới</h3>
        <div className="form-CapSo">
          <h1>Thông tin khách hàng</h1>
          <div className="check-BHYT d-flex">
            <div className="d-flex">
              <input type="checkbox" checked={BHYT ? true : false} onClick={() => setBHYT(!BHYT)} />
              <p>Sử dụng BHYT</p>
            </div>
            <div className="d-flex">
              <input type="checkbox" checked={BHYT ? false : true} onClick={() => setBHYT(!BHYT)} />
              <p>Không sử dụng BHYT</p>
            </div>
          </div>
          <div className="no-BHYT" hidden={BHYT ? true : false}>
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
          </div>
          <div className="no-BHYT" hidden={BHYT ? false : true}>
            <div className="col-12 mb-3 profile-customer">
              <label className="form-label">Mã BHYT:</label>
              <input
                type="text"
                value={customerName}
                className="form-control"
                placeholder="Nhập mã BHYT"
                onChange={e => setCustomerName(e.target.value)}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button onClick={() => props.HandleClickContinue(customerName, email, phoneNumber)}>
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
