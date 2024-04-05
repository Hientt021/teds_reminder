"use client";
import { useAppSelector } from "@/store";
import UserDropdown from "../dropdown/UserDropdown";
import CardComponent from "../card/CardComponent";
import { usePathname } from "next/navigation";
import { Typography } from "@mui/material";
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
