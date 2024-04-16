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
import { IProject, ITaskPayload } from "@/type";
import { toast } from "@/utils/toast";
import DatePickerComponent from "@/components/date-picker/DatePickerComponent";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { priorityList } from "@/const";

export interface ICreateTaskFormProps {
  onSuccess?: (newProject: IProject) => void;
  onClose: () => void;
  board: string;
}

export default function CreateTaskForm(props: ICreateTaskFormProps) {
  const { onSuccess, onClose, board } = props;
  const user = useAppSelector((state) => state.app.user);
  const dispatch = useAppDispatch();
  const params = useParams();
  const projectId = params.id as string;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      members: [],
      priority: "",
      deadline: dayjs().endOf("day").unix(),
      scopes: "",
      board: board,
      status: "",
    },
    validationSchema: createProjectSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const payload: ITaskPayload = {
          ...values,
          project_id: projectId,
          status: "",
        };
        const res = await dispatch(projectActions.createProjectTask(payload));
        if (res) {
          onSuccess && onSuccess((res.payload as any).data);
          toast("Create new task successfully", "success");
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
        <TextField
          label={"Description"}
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={!!formik.errors.description}
          helperText={formik.errors.description}
        />

        <TextField
          label={"Scopes"}
          name="scopes"
          value={formik.values.scopes}
          onChange={formik.handleChange}
          error={!!formik.errors.scopes}
          helperText={formik.errors.scopes}
        />

        <DatePickerComponent
          name="deadline"
          disablePast
          value={dayjs.unix(formik.values.deadline)}
          label="Deadline"
          onChange={(value) => formik.setFieldValue("deadline", value?.unix())}
        />

        <BasicSelect
          label={"Priority"}
          name="priority"
          value={formik.values.priority}
          onChange={formik.handleChange}
          options={priorityList}
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
