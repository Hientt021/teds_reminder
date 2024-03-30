"use client";
import { useFormik } from "formik";
import * as React from "react";
import { signUpSchema } from "./schema";
import { Button, Stack, TextField } from "@mui/material";

export interface ISignUpFormProps {}

export default function SignUpForm(props: ISignUpFormProps) {
  const formik = useFormik({
    initialValues: {
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} mt={1} width={300}>
        <TextField label="Email" variant="outlined" />
        <TextField label="User name" variant="outlined" />
        <TextField label="Create Password" type="password" variant="outlined" />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
        />
        <Button variant="outlined">Register</Button>
      </Stack>
    </form>
  );
}
