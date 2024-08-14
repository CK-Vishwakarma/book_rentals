import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROUTES } from "@/constants/api";
import Axios from "@/utils/axios";
import { IRegister, ISignIn } from "@/interfaces/auth";

export const signIn = createAsyncThunk(
  'signIn',
  async (body: ISignIn, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post(API_ROUTES.login, body);
      return data;
    } catch (error: any) {
      return rejectWithValue({ ...error.response?.data, error: true });
    }
  }
);
export const register = createAsyncThunk(
  'register',
  async (body: IRegister, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post(API_ROUTES.register, body);
      return data;
    } catch (error: any) {
      return rejectWithValue({ ...error.response?.data, error: true });
    }
  }
);