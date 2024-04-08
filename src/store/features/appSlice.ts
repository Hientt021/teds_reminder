import api from "@/api";
import { ILoginRes, IUser } from "@/app/(auth)/login/LoginForm";
import { IRegisterRes } from "@/app/(auth)/register/SignUpForm";
import { IMessageType } from "@/hook/toast/useToast";
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
  show: boolean;
  message?: string;
  type: IMessageType;
}

const initToast = {
  show: false,
  message: "",
  type: "info" as IMessageType,
};

const initialState: IAppSlice = {
  user: undefined,
  accessToken: undefined,
  isAuthenticated: false,
  toast: initToast,
};

const emailLogin = createAsyncThunk(
  "app/emailLogin",
  async (query: { email: string; password: string }, { rejectWithValue }) => {
    const res = await api.login<ILoginRes>(query);
    NextRequest;
    return res;
  }
);

const register = createAsyncThunk(
  "app/register",
  async (
    query: { email: string; password: string; userName: string },
    { rejectWithValue }
  ) => {
    const res = await api.register<IRegisterRes>(query);

    return res;
  }
);

const handleRefreshToken = createAsyncThunk(
  "app/handleRefreshToken",
  async () => {
    const res = await api.refresh<ILoginRes>();
    return res;
  }
);

const logout = createAsyncThunk("app/logout", async () => {
  const res = await api.logout<any>();
  window.location.pathname = "/login";
  localStorage.removeItem("TOKEN");
  return res;
});
const getMe = createAsyncThunk("app/getMe", async () => {
  const res = await api.getMe<IUser>();
  return res;
});

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.toast = { ...action.payload, show: true };
    },
    hideToast: (state) => {
      state.toast = initToast;
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
  register,
};
export default appSlice.reducer;
