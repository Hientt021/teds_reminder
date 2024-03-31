"use client";
import { routes } from "@/routes/const";
import { useAppDispatch } from "@/store";
import { appActions } from "@/store/features/appSlice";
import { getAccessToken, getValidToken } from "@/utils/auth";
import { redirect, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
interface IAuthProvider {
  children: React.ReactNode;
}
const AuthProvider = (props: IAuthProvider) => {
  const { children } = props;
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const init = async () => {
    const route = routes.find((el) => el.href === pathname);
    const isPrivate = route?.private;

    if (isPrivate) {
      const res = await dispatch(appActions.getMe());
      console.log(res);
    }
  };

  useEffect(() => {
    init();
  }, []);
  return <>{children}</>;
};

export default AuthProvider;
