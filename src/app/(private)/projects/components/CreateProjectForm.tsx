"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import { projectActions } from "@/store/features/projectSlice";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import BasicModal from "../../../../components/modal/BasicModal";
import { createProjectSchema } from "../../schema";
import { LoadingButton } from "@mui/lab";
import BasicSelect from "@/components/select/BasicSelect";
import { IProject } from "@/type";
import { toast } from "@/utils/toast";
import DatePickerComponent from "@/components/date-picker/DatePickerComponent";
import dayjs from "dayjs";

export interface ICreateProjectFormProps {
  onSuccess?: (newProject: IProject) => void;
  onClose: () => void;
}

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

export default function CreateProjectForm(props: ICreateProjectFormProps) {
  const { onSuccess, onClose } = props;
  const user = useAppSelector((state) => state.app.user);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      status: "pending",
      members: user?.id ? [user?.id] : [],
      start_date: dayjs().startOf("day").unix(),
      end_date: dayjs().endOf("day").unix(),
    },
    validationSchema: createProjectSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await dispatch(projectActions.createProject(values));
        if (res) {
          onSuccess && onSuccess((res.payload as any).data);
          toast("Create new project successfully", "success");
          onClose();
        }
      } catch (e: any) {
        toast(e.message, "error");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label={"Title"}
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={!!formik.errors.title}
          helperText={formik.errors.title}
        />
        <DatePickerComponent
          disablePast
          name="start_date"
          value={dayjs.unix(formik.values.start_date)}
          onChange={(value) => {
            formik.setFieldValue("start_date", value?.unix());
          }}
          label="Start date"
        />
        <DatePickerComponent
          name="end_date"
          shouldDisableDate={(cur) =>
            cur.isBefore(dayjs.unix(formik.values.start_date))
          }
          value={dayjs.unix(formik.values.end_date)}
          label="End date"
          onChange={(value) => formik.setFieldValue("end_date", value?.unix())}
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
  );
}
