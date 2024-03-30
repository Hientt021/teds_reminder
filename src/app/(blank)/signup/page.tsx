import { Button } from "@mui/base";
import { Metadata } from "next";
import Image from "next/image";
import SignUpForm from "./SignUpForm";
import Link from "next/link";
export const metadata: Metadata = {
  title: "SignUp",
};
export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center gap-10">
      <Image
        src={require("/public/images/signup.png")}
        alt="SignUp"
        style={{
          width: "auto",
          height: 400,
        }}
      />
      <div className="flex flex-col justify-center  gap-3">
        <SignUpForm />
        <div className="text-center">
          Already have an account?
          <span className="text-blue-300 cursor-pointer ml-1">
            <Link href="/login">Login</Link>{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
