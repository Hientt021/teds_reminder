"use client";
import { useFormik } from "formik";

import LoadingButton from "@mui/lab/LoadingButton";
import { ROUTES } from "@/routes/const";
import { useAppDispatch } from "@/store";
import { appActions } from "@/store/features/appSlice";
import { toast } from "@/utils/toast";
import { CircularProgress, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginSchema } from "../schema";

export interface ILoginFormProps {}

export interface ILoginProps {
  userName: string;
  password: string;
}

export interface IUser {
  email: string;
  userName: string;
  created_at: string;
  updated_at: string;
  _id: string;
}

export interface ILoginRes {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export default function LoginForm(props: ILoginFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await dispatch(appActions.emailLogin(values));
        toast("Logged in successfully", "success");
        router.push(ROUTES.DASHBOARD);
      } catch (e) {
        toast(e as string, "error");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Stack spacing={2}>
      <Typography className="text-2xl font-semibold" color={"primary"}>
        Login to your account
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2} mt={1} width={300}>
          <TextField
            variant="outlined"
            label={"Email"}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField
            type="password"
            variant="outlined"
            label={"Password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          <LoadingButton loading={loading} variant="outlined" type="submit">
            Login
          </LoadingButton>
        </Stack>
      </form>
      <div className="flex gap-2 justify-center">
        <Typography>New User?</Typography>
        <Typography className="cursor-pointer" color={"primary"}>
          <Link href={ROUTES.REGISTER}>Sign Up</Link>
        </Typography>
      </div>
    </Stack>
  );
}
