"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import { projectActions } from "@/store/features/projectSlice";
import { toast } from "@/utils/toast";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import BasicModal from "../../../../components/modal/BasicModal";
import { createProjectSchema } from "../../schema";
import { LoadingButton } from "@mui/lab";
import BasicSelect from "@/components/select/BasicSelect";

export interface IAddNewTaskProps {}

const projectStatus = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "active",
    label: "Active",
  },
  {
    value: "completed",
    label: "Completed",
  },
  {
    value: "terminated",
    label: "Terminated",
  },
];

export default function AddNewTask(props: IAddNewTaskProps) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      status: "pending",
      members: [],
    },
    validationSchema: createProjectSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await dispatch(projectActions.createProject(values));
        toast("Create new project successfully", "success");
        onClose();
      } catch (e) {
        toast(e as string, "error");
      } finally {
        setLoading(false);
      }
    },
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

            <BasicSelect
              label={"Status"}
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              options={projectStatus}
            />

            <Box className="flex justify-end gap-3">
              <Button variant="text" color="inherit" onClick={onClose}>
                Cancel
              </Button>
              <LoadingButton loading={loading} type="submit" variant="outlined">
                Add
              </LoadingButton>
            </Box>
          </Stack>
        </form>
      </BasicModal>
    </div>
  );
}
