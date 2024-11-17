import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const getInitialState = () => {
  // Fetch the initial state from cookies
  const accessToken = Cookies.get('accessToken');
  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  return { accessToken, user };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, user } = action.payload;
      state.accessToken = accessToken;
      state.user = user;

      // Save the updated state to cookies
      Cookies.set('accessToken', accessToken, { expires: 7 }); 
      Cookies.set('user', JSON.stringify(user), { expires: 7 });
    },
    clearCredentials: (state) => {
      state.accessToken = null;
      state.user = null;

      // Remove data from cookies
      Cookies.remove('accessToken');
      Cookies.remove('user');
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
