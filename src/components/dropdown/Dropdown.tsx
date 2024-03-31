import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  MenuProps,
  Paper,
  SxProps,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { MouseEventHandler, useRef, useState } from "react";

interface IDropdown {
  options: IOption[];
  icon?: React.ReactNode;
  label?: React.ReactNode;
  onValueChange?: (value: string) => void;
  value?: string;
  children?: React.ReactNode;
  closeAfterChange?: boolean;
  sx?: SxProps<Theme>;
  header?: React.ReactNode;
}

export interface IOption {
  icon?: React.ReactNode;
  label: string;
  value: string;
}
export default function Dropdown(props: IDropdown) {
  const {
    value = "",
    label = "",
    icon = <></>,
    options,
    onValueChange,
    children = <></>,
    closeAfterChange = true,
    sx,
    header,
  } = props;
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);
  const onOpen = (e: any) => setAnchor(e.currentTarget);
  const onClose = () => setAnchor(null);

  return (
    <>
      <Menu
        anchorEl={anchor}
        open={open}
        onClose={onClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={sx}>
          <MenuList>
            {header}
            {options.map((el, i) => (
              <MenuItem
                onClick={(e: any) => {
                  const str = el.value === value ? "" : el.value;
                  onValueChange && onValueChange(str);
                  onClose();
                }}
                selected={value === el.value}
                key={i}
                value={el.value}
                sx={{ py: 1 }}
              >
                <ListItemIcon>{el?.icon}</ListItemIcon>
                <Typography>{el.label}</Typography>
              </MenuItem>
            ))}
          </MenuList>
        </Box>
      </Menu>

      <Tooltip title={label}>
        <IconButton onClick={onOpen} size="small" sx={{ ml: 2 }}>
          {icon}
          {children}
        </IconButton>
      </Tooltip>
    </>
  );
}
