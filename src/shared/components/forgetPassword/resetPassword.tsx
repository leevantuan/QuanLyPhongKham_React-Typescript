import { useState } from 'react';
import LogoImg from '../../assets/logo.png';
import InputPassword from '../input/inputPassword';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

export default function ResetPassword() {
  const [password, setPassword] = useState<string>('');
  const [comfirmPassword, setComfirmPassword] = useState<string>('');
  const [activeBorder, setActiveBorder] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  return (
    <div className="container-forget-password">
      <img className="logo-login" src={LogoImg} alt="" />
      <h4 className="d-flex justify-content-center fw-bold" style={{ marginTop: 100 }}>
        Đặt lại mật khẩu
      </h4>
      <div style={{ marginLeft: 122 }}>
        <div className="mb-3 ">
          <label>Mật khẩu</label>
          <br />
          <InputPassword
            placeholder="Mật khẩu "
            width={400}
            height={44}
            border={activeBorder ? '1px solid red' : ''}
            HandleChangeInput={event => setPassword(event.target.value)}
          />
        </div>
        <div className="mb-3 ">
          <label>Nhập lại mật khẩu</label>
          <br />
          <InputPassword
            placeholder="Nhập lại mật khẩu "
            width={400}
            height={44}
            border={activeBorder ? '1px solid red' : ''}
            HandleChangeInput={event => setComfirmPassword(event.target.value)}
          />
        </div>
      </div>
      {message === '' ? (
        ''
      ) : (
        <div className="form-text text-danger d-flex">
          <AiOutlineExclamationCircle />
          <p>Hehehee</p>
        </div>
      )}
      <div className="container-button ">
        <div className="d-flex justify-content-center">
          <button className="btn-custom" onClick={() => {}}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
