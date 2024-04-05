import { Button } from "@mui/base";
import { Metadata } from "next";
import Image from "next/image";
import SignUpForm from "./SignUpForm";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Sign Up",
};
export default function SignUpPage() {
  return (
    <>
      <div className="p-20">
        <Image
          priority
          src={require(`/public/images/register.png`)}
          alt={"register"}
          style={{
            width: "auto",
            height: 400,
          }}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-3 bg-white rounded-e-2xl">
        <SignUpForm />
      </div>
    </>
  );
}
