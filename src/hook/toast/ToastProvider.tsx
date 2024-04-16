"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import { appActions, initToast } from "@/store/features/appSlice";
import { IMessageType } from "@/type";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { message, type } = useAppSelector((state) => state.app.toast);
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const toast = (content: string, type: IMessageType = "info") =>
    enqueueSnackbar(content, {
      variant: type,
      anchorOrigin: { vertical: "top", horizontal: "center" },
      onClose: () => dispatch(appActions.showToast(initToast)),
    });
  useEffect(() => {
    if (message) {
      toast(message, type);
    }
  }, [message]);

  return children;
}
