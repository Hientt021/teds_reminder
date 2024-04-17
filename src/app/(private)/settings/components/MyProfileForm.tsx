"use client";

import { Button, Stack } from "@mui/material";
import Avatar from "@/components/avatar/Avatar";
import { useAppDispatch, useAppSelector } from "@/store";
import { toast } from "@/utils/toast";
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { updateProfileSchema } from "../../schema";

import { teal } from "@mui/material/colors";
import { appActions } from "@/store/features/appSlice";
import axios from "axios";
import { BASE_URL } from "@/const";
export interface IMyProfileFormProps {}

export default function MyProfileForm(props: IMyProfileFormProps) {
  const { user, accessToken } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: user?.userName,
      email: user?.email,
      avatar: BASE_URL + "/" + user?.avatar,
    },
    // validationSchema: updateProfileSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        let formData = new FormData();
        formData.append("avatar", values.avatar!!);
        const res = await axios.post(
          BASE_URL + "/api/v1/upload/avatar",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + accessToken,
            },
          }
        );

        if (res.data) {
          const newProfile = await dispatch(
            appActions.updateMe({ ...values, avatar: res.data.url })
          );
          if (newProfile) toast("Update profile successfully", "success");
        }
      } catch (e: any) {
        toast(e.message, "error");
      } finally {
        setLoading(false);
      }
    },
  });

  const onUpload = (newFile: File) => {
    formik.setFieldValue("avatar", newFile);
  };

  return (
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
      <Box className="flex justify-center items-center ">
        <Avatar src={user?.avatar} editable size={200} onChange={onUpload} />
      </Box>

      <Stack spacing={2} mt={3}>
        <TextField
          label={"User Name"}
          name="userName"
          value={formik.values.userName}
          onChange={formik.handleChange}
          error={!!formik.errors.userName}
          helperText={formik.errors.userName}
        />
        <TextField
          label={"Email"}
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={!!formik.errors.email}
          helperText={formik.errors.email}
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
  );
}
