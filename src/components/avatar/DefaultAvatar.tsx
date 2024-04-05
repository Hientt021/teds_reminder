"use client";

import { useAppSelector } from "@/store";
import { Box, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";

export interface IDefaultAvatarProps {
  src?: string;
  size?: number;
}

const size = 50;

export default function DefaultAvatar(props: IDefaultAvatarProps) {
  const { src } = props;
  const user = useAppSelector((state) => state.app.user);

  const getDefaultName = () => {
    if (!user) return "";
    const nameArr = user?.userName.split(" ");
    return nameArr[0][0] + nameArr[1][0];
  };
  return (
    <Box
      width={size}
      height={size}
      sx={{ background: "#33ab9f", borderRadius: 3 }}
      className={"flex justify-center items-center "}
    >
      <Typography sx={{ color: "white" }}>{getDefaultName()}</Typography>
    </Box>
  );
}
