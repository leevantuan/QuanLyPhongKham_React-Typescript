import './styles.scss';
import LogoImg from '../../assets/logo.png';
import InputText from '../input/inputText';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForgetPasswordType } from '../../../@types';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

export default function CheckEmail(props: ForgetPasswordType) {
  let navigate = useNavigate();

  const [emailInput, setEmailInput] = useState<string>('');

  return (
    <div className="container-forget-password">
      <img className="logo-login" src={LogoImg} alt="" />
      <div style={{ marginTop: 100 }}>
        <h4 className="d-flex justify-content-center fw-bold">Đặt lại mật khẩu</h4>
        <label className="d-flex justify-content-center">
          Vui lòng nhập email để đặt lại mật khẩu của bạn *
        </label>
        <div className="d-flex justify-content-center input-text">
          <InputText
            placeholder="Email "
            width={400}
            height={44}
            border={props.activeBorder ? '1px solid red' : ''}
            HandleChangeInput={event => setEmailInput(event.target.value)}
          />
        </div>
        {props.message === '' ? (
          ''
        ) : (
          <div className="form-text text-danger d-flex">
            <AiOutlineExclamationCircle />
            <p>{props.message}</p>
          </div>
        )}
        <div className="container-button ">
          <div className="d-flex justify-content-between">
            <button onClick={() => navigate('/', { replace: true })}>Hủy</button>
            <button onClick={() => props.HandleClickContinue(emailInput)}>Tiếp tục</button>
          </div>
        </div>
      </div>
    </div>
  );
}
