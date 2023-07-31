import './styles.scss';
import ForgetImg from '../../../shared/assets/forgetImg.png';
import CheckEmail from '../../../shared/components/forgetPassword/checkEmail';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/customRedux';
import { AccountLogin } from '../../../core/redux';
import { AccountInferface } from '../../../@types';
import ResetPassword from '../../../shared/components/forgetPassword/resetPassword';

export default function ViewForgetPassword() {
  const dispatch = useAppDispatch();
  const InfoAccount = useAppSelector(state => state.queuing_system.Account);

  useEffect(() => {
    dispatch(AccountLogin());
  }, [dispatch]);

  const [findIdAccount, setFindIdAccount] = useState<string>('');
  const [openResetPassword, setOpenResetPassword] = useState<boolean>(false);
  const [activeBorder, setActiveBorder] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const HandleClickContinue = (emailInput: string) => {
    const checkEmail = InfoAccount.find(account => account.email === emailInput);
    if (checkEmail) {
      setFindIdAccount(checkEmail.id);
      setOpenResetPassword(true);
      setActiveBorder(false);
    } else {
      setActiveBorder(true);
      setMessage('Email không đúng vui lòng nhập lại');
    }
  };

  return (
    <div className="container-fluid col-12 d-flex" style={{ padding: 0 }}>
      <div className="left-login col-4">
        {openResetPassword ? (
          <ResetPassword />
        ) : (
          <CheckEmail
            activeBorder={activeBorder}
            HandleClickContinue={HandleClickContinue}
            message={message}
          />
        )}
      </div>
      <div className="right-login col-8">
        <img className="ms-4" src={ForgetImg} alt="" />
      </div>
    </div>
  );
}
