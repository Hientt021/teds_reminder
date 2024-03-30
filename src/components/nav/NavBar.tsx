import * as React from "react";
import Logo from "./Logo";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
export interface INavBarProps {}

export default function NavBar(props: INavBarProps) {
  return (
    <div className="flex justify-between w-full items-center p-5 shadow-lg">
      <div></div>
      <div className="flex gap-3">
        <SettingsIcon />
        <PersonIcon />
      </div>
    </div>
  );
}
