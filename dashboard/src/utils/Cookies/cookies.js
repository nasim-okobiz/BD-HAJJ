import Cookies from 'js-cookie';

export const loginCookies = (token) => {
  Cookies.set('authToken', token, { 
    expires: 7, 
    secure: true,
    sameSite: 'strict'
  });
  return true;
};

export const logoutCookies = () => {
  Cookies.remove('authToken');
};

export const checkAuthCookies = () => {
  const token = Cookies.get('authToken');
  if (!token) {
    logoutCookies();
    return false;
  }
  return true;
};

// export const checkAuthCookies = (dispatch, navigate, message) => {
//   const token = Cookies.get('authToken');
//   if (!token) {
//     logoutCookies();
//     dispatch(logoutUser());
//     message.success("You have been logged out!");
//     navigate("/");
//     return false;
//   }
//   return true;
// };