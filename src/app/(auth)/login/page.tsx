import { Button } from "@mui/base";
import { Metadata } from "next";
import Image from "next/image";
import LoginForm from "./LoginForm";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Login",
};
export default function LoginPage() {
  return (
    <>
      <div className="p-20">
        <Image
          priority
          src={require(`/public/images/login.png`)}
          alt={"login"}
          style={{
            width: "auto",
            height: 400,
          }}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-3 bg-white rounded-e-2xl">
        <LoginForm />
      </div>
    </>
  );
}
