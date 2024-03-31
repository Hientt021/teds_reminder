import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import SnackProvider from "@/hook/toast/SnackbarProvider";
import AuthProvider from "@/middleware/AuthProvider";
const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
      </head>
      <body className={roboto.className}>
        <StoreProvider>
          <SnackProvider>
            <AuthProvider>{children}</AuthProvider>
          </SnackProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
