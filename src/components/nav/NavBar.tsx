"use client";
import { Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import UserDropdown from "../dropdown/UserDropdown";
export interface INavBarProps {}

export default function NavBar(props: INavBarProps) {
  return (
    <div className="flex justify-between items-center">
      {/* <CardComponent className="flex justify-between items-center p-5 bg-white"> */}
      <div></div>
      <div className="flex gap-3">
        <UserDropdown />
      </div>
      {/* </CardComponent> */}
    </div>
  );
}
