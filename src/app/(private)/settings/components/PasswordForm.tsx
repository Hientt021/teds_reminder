"use client";

import { Button, Stack } from "@mui/material";
import Avatar from "@/components/avatar/Avatar";
import { useAppDispatch, useAppSelector } from "@/store";
import { toast } from "@/utils/toast";
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { updateProfileSchema } from "../../schema";
import EditIcon from "@mui/icons-material/Edit";
import { teal } from "@mui/material/colors";
export interface IPasswordFormProps {}

export default function PasswordForm(props: IPasswordFormProps) {
  const user = useAppSelector((state) => state.app.user);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    // validationSchema: updateProfileSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        // const res = await dispatch(projectActions.createProject(values));
        // if (res) {

        //   toast("Create new project successfully", "success");

        // }
      } catch (e: any) {
        toast(e.message, "error");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label={"Old Name"}
            name="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            error={!!formik.errors.oldPassword}
            helperText={formik.errors.oldPassword}
          />
          <TextField
            label={"New Password"}
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={!!formik.errors.newPassword}
            helperText={formik.errors.newPassword}
          />
        </Stack>
        <LoadingButton
          sx={{ float: "right", mt: 2 }}
          loading={loading}
          type="submit"
          variant="outlined"
        >
          Save
        </LoadingButton>
      </form>
    </Box>
  );
}
