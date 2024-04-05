"use client";
import MainLoader from "@/components/loader/MainLoader";
import { ROUTES, routes } from "@/routes/const";
import { useAppDispatch, useAppSelector } from "@/store";
import { appActions } from "@/store/features/appSlice";
import { getAccessToken, getValidToken } from "@/utils/auth";
import { toast } from "@/utils/toast";
import { redirect, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createContext } from "vm";

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  isInitialized: boolean;
}

export default function AuthProvider(props: AuthProviderProps) {
  const { children } = props;
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.app);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const init = async () => {
    try {
      setLoading(true);
      await dispatch(appActions.getMe());
    } catch (e) {
      toast(e as string, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") init();
  }, []);

  return loading ? <MainLoader /> : children;
}
