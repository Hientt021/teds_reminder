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
export interface IMyProfileFormProps {}

export default function MyProfileForm(props: IMyProfileFormProps) {
  const user = useAppSelector((state) => state.app.user);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const formik = useFormik({
    initialValues: {
      userName: user?.userName,
      email: user?.email,
      avatar: user?.avatar,
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        console.log(values);
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

  const onUpload = (event: any) => {
    const files = event.target.files;
    const reader = new FileReader();
    formik.setFieldValue("avatar", files[0]);
    reader.readAsDataURL(files[0]);

    reader.addEventListener("load", (e: any) => {
      const url = e?.target?.result;
      // if (url)
      //   fetch(url.toString())
      //     .then((res) => res.blob())
      //     .then((blob) => console.log(URL.createObjectURL(blob)));
      setAvatar(url);
    });
  };

  return (
    <Box>
      <Box className="flex flex-col my-5 gap-5 justify-center items-center relative">
        <Box className="relative">
          <Avatar src={avatar} size={200} />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              cursor: "pointer",
              transform: "translate(-25%, -25%)",
              border: "1px solid " + teal[500],
              borderRadius: "50%",
              p: "5px",
              background: "#F5F5F9",
            }}
            onClick={() => document.getElementById("upload")?.click()}
          >
            <EditIcon color={"primary"} />
          </Box>
        </Box>

        {/* <Button
          variant="contained"
          onClick={() => document.getElementById("upload")?.click()}
        >
          Upload
        </Button> */}
        <TextField
          sx={{ display: "none" }}
          id="upload"
          type="file"
          onChange={onUpload}
        >
          Upload
        </TextField>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
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
    </Box>
  );
}
