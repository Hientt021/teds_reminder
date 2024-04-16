"use client";

import { Box, Stack, Typography } from "@mui/material";

export interface IPageContainerProps {
  title?: string;
  children: React.ReactNode;
}

export default function PageContainer(props: IPageContainerProps) {
  const { title, children } = props;
  return (
    <Box className="h-full" sx={{ overflow: "auto" }}>
      {title && (
        <Typography
          className="capitalize"
          fontWeight={600}
          color="primary"
          variant="h5"
        >
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
}
