import { Route, Routes } from 'react-router-dom';
import ViewLogin from '../view/used/login';
import ViewForgetPassword from '../view/used/forgetPassword';
import ViewIndex from '../view/home/viewIndex';

export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<ViewLogin />} />
      <Route path="/ForgetPassword" element={<ViewForgetPassword />} />
      <Route path="/ViewIndex" element={<ViewIndex />} />
    </Routes>
  );
}
