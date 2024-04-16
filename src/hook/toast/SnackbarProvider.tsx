"use client";

import { SnackbarProvider } from "notistack";
import ToastProvider from "./ToastProvider";

export default function SnackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SnackbarProvider>
      <ToastProvider>{children}</ToastProvider>
    </SnackbarProvider>
  );
}
