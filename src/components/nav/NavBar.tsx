"use client";
import { Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import UserDropdown from "../dropdown/UserDropdown";
export interface INavBarProps {}

export default function NavBar(props: INavBarProps) {
  const pathname = usePathname() || "";

  return (
    <div className="flex justify-between items-center">
      {/* <CardComponent className="flex justify-between items-center p-5 bg-white"> */}
      <div>
        <Typography
          className="capitalize"
          fontWeight={600}
          color="primary"
          variant="h5"
        >
          {pathname.slice(1)}
        </Typography>
      </div>
      <div className="flex gap-3">
        <UserDropdown />
      </div>
      {/* </CardComponent> */}
    </div>
  );
}
