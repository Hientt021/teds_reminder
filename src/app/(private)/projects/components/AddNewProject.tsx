"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import BasicModal from "../../../../components/modal/BasicModal";

export interface IAddNewTaskProps {}

export default function AddNewTask(props: IAddNewTaskProps) {
  const [open, setOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    // validationSchema: signUpSchema,
    onSubmit: async (values) => {},
  });
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <div>
      <Button variant="outlined" onClick={onOpen}>
        Add New Project
      </Button>

      <BasicModal
        open={open}
        onClose={onClose}
        header={<Typography variant="h6">Create new project</Typography>}
      >
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label={"Title"}
              name="title"
              value={formik.values.title}
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
