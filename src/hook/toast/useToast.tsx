"use client";
import { Alert, Snackbar } from "@mui/material";

import { useEffect, useState } from "react";
import { SharedProps, useSnackbar } from "notistack";

export type IMessageType = "info" | "error" | "success" | "warning";

export default function useToast() {
  const { enqueueSnackbar } = useSnackbar();

  const toast = (content: string, type?: IMessageType) =>
    enqueueSnackbar(content, {
      variant: type || "default",
      anchorOrigin: { vertical: "top", horizontal: "center" },
    });

  return toast;
}
