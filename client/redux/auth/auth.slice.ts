import { createSlice } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { signIn } from './auth.api';
import { COOKIE_KEYS, USER_ROLE } from '@/constants/common';

const token = getCookie(COOKIE_KEYS.token);
let userDetails = getCookie(COOKIE_KEYS.user);
let userRole = getCookie(COOKIE_KEYS.role);
userDetails = userDetails;

interface AuthInterface {
  isLoggedIn: boolean;
  userDetails?: any;
  userRole: string;
}

const initialState: AuthInterface = {
  isLoggedIn: token ? true : false,
  userDetails,
  userRole: userRole ?? USER_ROLE.MEMBER
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout: (state) => {
      Object.values(COOKIE_KEYS).forEach(el => {
        deleteCookie(el);
      });
      state.isLoggedIn = false;
      state.userDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      const { access_token, email, role } = action.payload
      if (access_token) {
        setCookie(COOKIE_KEYS.token, access_token);
        setCookie(COOKIE_KEYS.user, JSON.stringify(email));
        setCookie(COOKIE_KEYS.role, role);
        state.userDetails = email;
        state.isLoggedIn = true;
      }
    });
  },
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
