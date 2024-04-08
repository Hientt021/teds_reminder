"use client";
import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import { ROUTES } from "@/routes/const";
import { useAppDispatch } from "@/store";
import { appActions } from "@/store/features/appSlice";
import { toast } from "@/utils/toast";
import { Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerSchema } from "../schema";

export interface ISignUpFormProps {}

export interface IRegisterRes {
  userName: string;
  password: string;
  email: string;
}

export default function SignUpForm(props: ISignUpFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      userName: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await dispatch(appActions.register(values));
        toast("Register successfully", "success");
        router.push(ROUTES.LOGIN);
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
        Create new account
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
            variant="outlined"
            label={"User name"}
            name="userName"
            value={formik.values.userName}
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
            Register
          </LoadingButton>
        </Stack>
      </form>
      <div className="flex gap-2 justify-center">
        <Typography> Already have an account?</Typography>
        <Typography className="cursor-pointer" color={"primary"}>
          <Link href={ROUTES.LOGIN}>Login</Link>
        </Typography>
      </div>
    </Stack>
  );
}
