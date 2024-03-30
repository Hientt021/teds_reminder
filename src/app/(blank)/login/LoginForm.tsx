"use client";
import { useFormik } from "formik";

import { loginSchema } from "./schema";
import { Button, Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import api from "@/api";
import { useRouter } from "next/navigation";

export interface ILoginFormProps {}

export interface ILoginProps {
  userName: string;
  password: string;
}

export interface ILoginRes {
  accessToken: string;
  refreshToken: string;
}

export default function LoginForm(props: ILoginFormProps) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const res = await api.login<ILoginRes>(values);
        if (res) {
          localStorage.setItem("TOKEN", res.accessToken);
          localStorage.setItem("REFRESH_TOKEN", res.refreshToken);
          router.push("/dashboard");
        }
      } catch (e) {
        alert(e);
      }
    },
  });

  return (
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
        <Button variant="outlined" type="submit">
          Login
        </Button>
      </Stack>
    </form>
  );
}
