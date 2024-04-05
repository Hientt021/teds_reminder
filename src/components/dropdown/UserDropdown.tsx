"use client";

import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import Dropdown from "../dropdown/Dropdown";
import { useAppSelector } from "@/store";
import { Box, Stack, Typography } from "@mui/material";
import { onLogout } from "@/utils/auth";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DefaultAvatar from "../avatar/DefaultAvatar";
export interface IUserDropdownProps {}

export default function UserDropdown(props: IUserDropdownProps) {
  const user = useAppSelector((state) => state.app.user);
  const userOptions = [
    {
      label: "Profile",
      icon: <PersonIcon />,
      value: "profile",
      onClick: () => {},
    },
    {
      label: "Setting",
      icon: <SettingsIcon />,
      value: "setting",
      onClick: () => {},
    },
    {
      label: "Logout",
      icon: <LogoutIcon />,
      value: "logout",
      onClick: onLogout,
    },
  ];

  const onValueChange = (value: string) => {
    const option = userOptions.find((el) => el.value === value);
    if (option) option.onClick();
  };

  return (
    <Dropdown
      header={
        <Box px={2} pt={1} pb={2}>
          {user && (
            <Stack className="items-center">
              <Typography mb={0.5}>{user.userName}</Typography>
              <Typography variant="body2"> {user.email}</Typography>
            </Stack>
          )}
        </Box>
      }
      icon={<DefaultAvatar />}
      options={userOptions}
      onValueChange={onValueChange}
      disableRipple
      sx={{ minWidth: 200 }}
    />
  );
}
