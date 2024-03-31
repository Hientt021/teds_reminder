import api from "@/api";
import { ILoginRes, IUser } from "@/app/(blank)/login/LoginForm";
import { getRefreshToken, setToken } from "@/utils/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IAppSlice {
  user?: IUser;
  accessToken?: string;
  refreshToken?: string;
  isAuthenticated: boolean;
}

const initialState: IAppSlice = {
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  isAuthenticated: false,
};

const emailLogin = createAsyncThunk(
  "app/emailLogin",
  async (query: { email: string; password: string }, { rejectWithValue }) => {
    const res = await api.login<ILoginRes>(query);
    return res;
  }
);

const handleRefreshToken = createAsyncThunk(
  "app/handleRefreshToken",
  async () => {
    const refreshToken = getRefreshToken();
    const res = await api.refresh<ILoginRes>({ refreshToken });
    return res;
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
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("REFRESH_TOKEN");
      state = initialState;
      window.location.pathname = "/login";
    },
  },
  extraReducers(builder) {
    builder.addCase(emailLogin.fulfilled, (state, action) => {
      const { user, ...token } = action.payload;
      setToken(token);
      return { ...action.payload, isAuthenticated: true };
    });
    builder.addCase(handleRefreshToken.fulfilled, (state, action) => {
      const token = action.payload;
      setToken(token);
      return { ...token, isAuthenticated: true };
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      return { ...state, user: action.payload };
    });
  },
});

export const appActions = {
  ...appSlice.actions,
  emailLogin,
  handleRefreshToken,
  getMe,
};
export default appSlice.reducer;
