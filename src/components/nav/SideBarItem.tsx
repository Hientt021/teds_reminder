"use client";

import { Box } from "@mui/material";
import { teal } from "@mui/material/colors";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export interface ISideBarItemProps {
  icon: React.ReactNode;
  label: string;
}

export default function SideBarItem(props: ISideBarItemProps) {
  const { icon, label } = props;
  const pathname = usePathname();
  const getLabel = (str: string) => {
    const arr = str.split("/");
    return arr.join("");
  };

  const curLabel = useMemo(() => getLabel(label), [label]);

  const isActive = useMemo(() => {
    const arr = pathname.split("/");
    return arr.find((el) => el === curLabel);
  }, [pathname]);

  return (
    <Box
      sx={{
        p: 1,
        background: isActive ? "#F5F5F9" : "transparent",
        color: isActive ? teal[500] : "#fff",
      }}
      className="capitalize flex gap-5 my-2 items-center rounded-s-lg"
    >
      {icon}
      {curLabel}
    </Box>
  );
}
