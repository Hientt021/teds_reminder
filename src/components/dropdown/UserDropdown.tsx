"use client";

import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import Dropdown from "../dropdown/Dropdown";
import { useAppSelector } from "@/store";
import { Box, Stack, Typography } from "@mui/material";
import { onLogout } from "@/utils/auth";
export interface IUserDropdownProps {}

export default function UserDropdown(props: IUserDropdownProps) {
  const user = useAppSelector((state) => state.app.user);
  const userOptions = [
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
        <Box px={2} mb={3}>
          {user && (
            <Stack className="items-center">
              <Typography mb={0.5}>{user.userName}</Typography>
              <Typography variant="body2"> {user.email}</Typography>
            </Stack>
          )}
        </Box>
      }
      label={
        user && (
          <Stack>
            <Typography>{user.userName}</Typography>
            <Typography>{user.email}</Typography>
          </Stack>
        )
      }
      icon={<PersonIcon />}
      options={userOptions}
      onValueChange={onValueChange}
    />
  );
}
