export const isLogin = () => {
  const token = localStorage.getItem('tokenUser');
  if (token) {
    return token;
  } else {
    return null;
  }
};
