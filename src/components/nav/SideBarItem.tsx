"use client";

import { Box } from "@mui/material";
import { teal } from "@mui/material/colors";
import { usePathname } from "next/navigation";

export interface ISideBarItemProps {
  icon: React.ReactNode;
  label: string;
}

export default function SideBarItem(props: ISideBarItemProps) {
  const { icon, label } = props;
  const pathname = usePathname();
  const getLabel = (str: string) => {
    const arr = str.split("/");
    return arr.join(" ");
  };
  return (
    <Box
      sx={{
        p: 1,
        background: pathname === label ? "#F5F5F9" : "transparent",
        color: pathname === label ? teal[500] : "#fff",
      }}
      className="capitalize flex gap-5 my-2 items-center rounded-s-lg"
    >
      {icon}
      {getLabel(label)}
    </Box>
  );
}
