import api from "@/api";
import { ILoginRes } from "@/app/(auth)/login/LoginForm";
import { IRegisterRes } from "@/app/(auth)/register/SignUpForm";

import { IMessageType, IResponse, IUser } from "@/type";
import { setToken } from "@/utils/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NextRequest } from "next/server";

interface IAppSlice {
  user?: IUser;
  accessToken?: string;
  isAuthenticated: boolean;
  toast: IToastMessage;
}

interface IToastMessage {
  message?: string;
  type: IMessageType;
}

export const initToast = {
  message: "",
  type: "info" as IMessageType,
};

const initUser = {
  email: "",
  userName: "",
  id: "",
};

const initialState: IAppSlice = {
  user: initUser,
  accessToken: undefined,
  isAuthenticated: false,
  toast: initToast,
};

const emailLogin = createAsyncThunk(
  "app/emailLogin",
  async (query: { email: string; password: string }, { rejectWithValue }) => {
    const res = await api.login<IResponse<ILoginRes>>(query);
    return res.data;
  }
);

const register = createAsyncThunk(
  "app/register",
  async (
    query: { email: string; password: string; userName: string },
    { rejectWithValue }
  ) => {
    const res = await api.register<IResponse<IRegisterRes>>(query);

    return res.data;
  }
);

const handleRefreshToken = createAsyncThunk(
  "app/handleRefreshToken",
  async () => {
    const res = await api.refresh<IResponse<ILoginRes>>();
    return res.data;
  }
);

const logout = createAsyncThunk("app/logout", async () => {
  const res = await api.logout<any>();
  window.location.pathname = "/login";
  localStorage.removeItem("TOKEN");
  return res;
});
const getMe = createAsyncThunk("app/getMe", async () => {
  const res = await api.getMe<IResponse<IUser>>();
  return res.data;
});

const updateMe = createAsyncThunk(
  "app/updateMe",
  async (query: any, { rejectWithValue }) => {
    console.log(query);
    const res = await api.updateMe<IResponse<IUser>>(query);
    return res.data;
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.toast = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(emailLogin.fulfilled, (state, action) => {
      const { accessToken } = action.payload;
      setToken(accessToken);
      return { ...state, accessToken, isAuthenticated: true };
    });
    builder.addCase(handleRefreshToken.fulfilled, (state, action) => {
      const { accessToken } = action.payload;
      setToken(accessToken);
      return { ...state, accessToken, isAuthenticated: true };
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      return { ...state, user: action.payload, isAuthenticated: true };
    });
    builder.addCase(updateMe.fulfilled, (state, action) => {
      return { ...state, user: action.payload };
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      return initialState;
    });
  },
});

export const appActions = {
  ...appSlice.actions,
  emailLogin,
  handleRefreshToken,
  logout,
  getMe,
  updateMe,
  register,
};
export default appSlice.reducer;
