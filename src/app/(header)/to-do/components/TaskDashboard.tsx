"use client";

import { Box, Typography } from "@mui/material";

export interface ITaskDashboardProps {
  data: any;
}

export default function TaskDashboard(props: ITaskDashboardProps) {
  const { data } = props;

  return (
    <Box>
      <Typography>To do </Typography>
      {data.map((el: any, i: number) => (
        <Box key={i}>
          <Typography>{el.title}</Typography>
          <Typography>{el.deadline}</Typography>
        </Box>
      ))}
    </Box>
  );
}
