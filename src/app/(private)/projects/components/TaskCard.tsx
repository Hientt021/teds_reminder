"use client";

import { priorityList } from "@/const";
import { ITask } from "@/type";
import { Box, Stack, Typography } from "@mui/material";

export interface ITaskCardProps {
  task: ITask;
}

export default function TaskCard(props: ITaskCardProps) {
  const { task } = props;
  const { scopes, title, description, priority } = task;

  return (
    <Stack p={2} className="bg-white" borderRadius={2}>
      <Box className="flex justify-between">
        <Typography>{scopes}</Typography>
        <Typography>
          {priorityList.find((el) => el.value === priority)?.label}
        </Typography>
      </Box>
      <Box>
        <Typography fontWeight={600}>{title}</Typography>
        <Typography color="gray">{description}</Typography>
      </Box>
      <Box></Box>
    </Stack>
  );
}
