"use client";
import { jwtDecode } from "jwt-decode";
import api from ".";
import { cookies } from "next/headers";
export const getToken = async () => {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("TOKEN");
  if (!token) return null;

  const decoded = jwtDecode(token);

  if (!decoded.exp) return null;
  const current = new Date().getTime();
  if (decoded.exp < current / 1000) {
    const newToken = await handleRefreshToken();
    return newToken;
  }
  return token;
};

const handleRefreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("REFRESH_TOKEN");
    if (!refreshToken) return;
    const data = await api.refresh<any>({ refreshToken });
    if (data) {
      localStorage.setItem("TOKEN", data.accessToken);
      localStorage.setItem("REFRESH_TOKEN", data.refreshToken);
      return data.accessToken;
    }
  } catch (e) {
    console.log(e);
  }
};

const getCookie = (name: string) => {
  const regex = new RegExp(`(^| )${name}=([^;]+)`);
  const match = document.cookie.match(regex);
  if (match) {
    return match[2];
  }
};
