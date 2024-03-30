"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import BasicModal from "../modal/BasicModal";
import { useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "@/app/(blank)/signup/schema";

export interface IAddNewTaskProps {}

export default function AddNewTask(props: IAddNewTaskProps) {
  const [open, setOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      deadline: "",
    },
    // validationSchema: signUpSchema,
    onSubmit: async (values) => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");

      const payload = JSON.stringify({ ...values });
      const res = await fetch(
        "https://teds-reminder-be.vercel.app/api/v1/task",
        {
          method: "POST",
          body: payload,
          headers: headers,
        }
      );
      const data = await res.json();
      if (data) console.log(data);
      onClose();
    },
  });
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <div>
      <Button variant="outlined" onClick={onOpen}>
        Add New Task
      </Button>

      <BasicModal
        open={open}
        onClose={onClose}
        header={<Typography variant="h6">Create new task</Typography>}
      >
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label={"Title"}
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <TextField
              label={"Deadline"}
              name="deadline"
              value={formik.values.deadline}
              onChange={formik.handleChange}
            />
            <Box className="flex justify-end gap-3">
              <Button variant="text" color="inherit" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="outlined">
                Add
              </Button>
            </Box>
          </Stack>
        </form>
      </BasicModal>
    </div>
  );
}
