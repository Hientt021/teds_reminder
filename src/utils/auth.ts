"use client";
import { store } from "@/store";
import { appActions } from "@/store/features/appSlice";
import { jwtDecode } from "jwt-decode";

export const setToken = (accessToken: string) => {
  localStorage.setItem("TOKEN", accessToken);
};

export const getAccessToken = () => {
  return localStorage.getItem("TOKEN") || "";
};

export const onLogout = () => {
  store.dispatch(appActions.logout());
};

export const isTokenExpired = (token: string) => {
  const decoded = jwtDecode(token);
  const exp = decoded.exp;
  const current = new Date().getTime();
  return exp ? exp < current / 1000 : false;
};

export const getValidToken = async () => {
  if (typeof window === "undefined") return "";
  const token = getAccessToken();
  if (!token) return "";

  // const isExpired = isTokenExpired(token);
  // if (isExpired) {
  //   const res = await store.dispatch(appActions.handleRefreshToken());
  //   if (res) {
  //     return (res.payload as any).accessToken;
  //   }
  // }

  return token;
};
