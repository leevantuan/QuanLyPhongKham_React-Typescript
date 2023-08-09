import './styles.scss';
import LogoImg from '../../../shared/assets/logo.png';
import LoginImg from '../../../shared/assets/loginImg.png';
import InputPassword from '../../../shared/components/input/inputPassword';
import InputText from '../../../shared/components/input/inputText';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/customRedux';
import { AccountLogin } from '../../../core/redux';

import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { HandleCheckLogin } from '../../../HandleLogic';

import { toast } from 'react-toastify';

export default function ViewLogin() {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const InfoAccount = useAppSelector(state => state.Account.Account);

  useEffect(() => {
    dispatch(AccountLogin());
  }, [dispatch]);
  const [userNameInput, setUserNameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [activeBorder, setActiveBorder] = useState<boolean>(false);

  const HanldeClickLogin = () => {
    const checkLogin = HandleCheckLogin(userNameInput, passwordInput, InfoAccount);
    const FindAccount = InfoAccount.find(account => account.userName === userNameInput);
    const token = FindAccount?.key;
    if (checkLogin) {
      if (token) {
        localStorage.setItem('tokenUser', token);
      }
      toast.success('Đăng nhập thành công');
      setActiveBorder(false);
      navigate('/ViewIndex', { replace: true });
    } else {
      toast.error('Đăng nhập thất bại');
      setActiveBorder(true);
      setMessage('Sai mật khẩu hoặc tên đăng nhập');
    }
  };
  return (
    <div className="container-fluid col-12 d-flex" style={{ padding: 0 }}>
      <div className="left-login col-4">
        <img className="logo-login" src={LogoImg} alt="" />
        <div className="form-login">
          <div className="mb-3 ">
            <label>Tên đăng nhập *</label>
            <br />
            <InputText
              placeholder="Tên đăng nhập "
              width={400}
              height={44}
              border={activeBorder ? '1px solid red' : ''}
              HandleChangeInput={event => setUserNameInput(event.target.value)}
            />
          </div>
          <div className="mb-3 mt-4">
            <label>Mật khẩu *</label>
            <br />
            <InputPassword
              placeholder="Mật khẩu "
              width={400}
              height={44}
              border={activeBorder ? '1px solid red' : ''}
              HandleChangeInput={event => setPasswordInput(event.target.value)}
            />
            {message === '' ? (
              <div
                style={{ cursor: 'pointer' }}
                className="form-text text-danger"
                onClick={() => navigate('/ForgetPassword', { replace: true })}
              >
                Quên mật khẩu?
              </div>
            ) : (
              <div className="form-text text-danger d-flex">
                <AiOutlineExclamationCircle />
                <p> {message}</p>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-custom" onClick={HanldeClickLogin}>
            Đăng nhập
          </button>
        </div>
        {message === '' ? (
          ''
        ) : (
          <div
            className="form-text text-danger d-flex justify-content-center mt-4"
            style={{ cursor: 'pointer', margin: 0 }}
            onClick={() => navigate('/ForgetPassword', { replace: true })}
          >
            Quên mật khẩu?
          </div>
        )}
      </div>
      <div className="right-login col-8">
        <img className="ms-4" src={LoginImg} alt="" />
      </div>
    </div>
  );
}
