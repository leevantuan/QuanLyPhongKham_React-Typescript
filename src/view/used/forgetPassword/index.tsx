import './styles.scss';
import ForgetImg from '../../../shared/assets/forgetImg.png';
import CheckEmail from '../../../shared/components/forgetPassword/checkEmail';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/customRedux';
import { AccountLogin } from '../../../core/redux';
import ResetPassword from '../../../shared/components/forgetPassword/resetPassword';
import { toast } from 'react-toastify';

export default function ViewForgetPassword() {
  const dispatch = useAppDispatch();
  const InfoAccount = useAppSelector(state => state.Account.Account);

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
      setFindIdAccount(checkEmail.key);
      setOpenResetPassword(true);
      setActiveBorder(false);
    } else {
      toast.error('Email không đúng');
      setActiveBorder(true);
      setMessage('Email không đúng vui lòng nhập lại');
    }
  };

  return (
    <div className="container-fluid col-12 d-flex" style={{ padding: 0 }}>
      <div className="login col-4">
        {openResetPassword ? (
          <ResetPassword AccountId={findIdAccount} />
        ) : (
          <CheckEmail
            activeBorder={activeBorder}
            HandleClickContinue={HandleClickContinue}
            message={message}
          />
        )}
      </div>
    </div>
  );
}
