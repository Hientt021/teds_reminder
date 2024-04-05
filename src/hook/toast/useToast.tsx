"use client";
import { Alert, Snackbar } from "@mui/material";

import { useEffect, useState } from "react";
import { SharedProps, useSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "@/store";
import { appActions } from "@/store/features/appSlice";

export type IMessageType = "info" | "error" | "success" | "warning";

export default function useToast() {
  const { enqueueSnackbar } = useSnackbar();
  const { show, message, type } = useAppSelector((state) => state.app.toast);
  const dispatch = useAppDispatch();
  const toast = (content: string, type?: IMessageType) =>
    enqueueSnackbar(content, {
      variant: type || "default",
      anchorOrigin: { vertical: "top", horizontal: "center" },
      onExit: () => dispatch(appActions.hideToast()),
      onClose: () => dispatch(appActions.hideToast()),
    });
  useEffect(() => {
    if (show && message) {
      toast(message, type);
    }
  }, [show]);
  return {};
}
