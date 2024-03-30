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
    <div className="flex justify-center items-center gap-10">
      <Image
        src={require("/public/images/login.png")}
        alt="login"
        style={{
          width: "auto",
          height: "auto",
        }}
      />
      <div className="flex flex-col justify-center  gap-3">
        <h6>Welcome</h6>
        <p>Login to continue</p>
        <LoginForm />
        <div className="text-center">
          New User?{" "}
          <span className="text-blue-300 cursor-pointer ml-1">
            <Link href="/signup">Sign Up</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
