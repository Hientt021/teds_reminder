"use client";

import { Box, Typography } from "@mui/material";

export interface IProjectDashboardProps {
  data: any;
}

export default function ProjectDashboard(props: IProjectDashboardProps) {
  const { data } = props;

  return (
    <Box>
      <Typography>Projects </Typography>
      {data.map((el: any, i: number) => (
        <Box key={i}>
          <Typography>{el.title}</Typography>
          <Typography>{el.deadline}</Typography>
        </Box>
      ))}
    </Box>
  );
}
