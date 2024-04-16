"use client";

import { useAppSelector } from "@/store";
import { Box, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import Image from "next/image";

export interface IAvatarProps {
  src?: string;
  size?: number;
}

const defaultSize = 50;

export default function Avatar(props: IAvatarProps) {
  const { src, size = defaultSize } = props;
  const user = useAppSelector((state) => state.app.user);

  return (
    <Box
      width={size}
      height={size}
      sx={{
        border: "1px solid #33ab9f",
        borderRadius: "50%",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
      className={"flex justify-center items-center "}
    >
      <Image
        width={size}
        height={size}
        alt="default_avatar"
        src={src ? src : require(`/public/images/avatar.png`)}
      />
    </Box>
  );
}
