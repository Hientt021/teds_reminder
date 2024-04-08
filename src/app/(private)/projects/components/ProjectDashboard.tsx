"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { projectActions } from "@/store/features/projectSlice";
import { toast } from "@/utils/toast";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

export interface IProjectDashboardProps {}

export default function ProjectDashboard(props: IProjectDashboardProps) {
  const dispatch = useAppDispatch();

  const { projects } = useAppSelector((state) => state.project);
  const getProjects = async () => {
    try {
      await dispatch(projectActions.getProjects());
    } catch (e) {
      toast(e as string, "error");
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Box>
      {projects.map((el: any, i: number) => (
        <Box key={i}>
          <Typography>{el.title}</Typography>
        </Box>
      ))}
    </Box>
  );
}
