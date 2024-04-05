import api from "@/api";
import { ILoginRes, IUser } from "@/app/(auth)/login/LoginForm";
import { IRegisterRes } from "@/app/(auth)/register/SignUpForm";
import { IMessageType } from "@/hook/toast/useToast";
import { getRefreshToken, setToken } from "@/utils/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IAppSlice {
  user?: IUser;
  accessToken?: string;
  refreshToken?: string;
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
  refreshToken: undefined,
  isAuthenticated: false,
  toast: initToast,
};

const emailLogin = createAsyncThunk(
  "app/emailLogin",
  async (query: { email: string; password: string }, { rejectWithValue }) => {
    const res = await api.login<ILoginRes>(query);
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
    try {
      const refreshToken = getRefreshToken();
      const res = await api.refresh<ILoginRes>({ refreshToken });
      return res;
    } catch (e) {}
  }
);

const getMe = createAsyncThunk("app/getMe", async () => {
  const res = await api.getMe<IUser>();
  return res;
});

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    logout: (state) => {
      window.location.pathname = "/login";
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("REFRESH_TOKEN");
      state = initialState;
    },
    showToast: (state, action) => {
      state.toast = { ...action.payload, show: true };
    },
    hideToast: (state) => {
      state.toast = initToast;
    },
  },
  extraReducers(builder) {
    builder.addCase(emailLogin.fulfilled, (state, action) => {
      const { user, ...token } = action.payload;
      setToken(token);
      return { ...state, ...action.payload, isAuthenticated: true };
    });
    builder.addCase(handleRefreshToken.fulfilled, (state, action) => {
      const token = action.payload;
      if (token) setToken(token);
      return { ...state, ...token, isAuthenticated: true };
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      return { ...state, user: action.payload, isAuthenticated: true };
    });
  },
});

export const appActions = {
  ...appSlice.actions,
  emailLogin,
  handleRefreshToken,
  getMe,
  register,
};
export default appSlice.reducer;
