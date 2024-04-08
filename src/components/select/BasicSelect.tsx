"use cliennt";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select, SelectProps } from "@mui/material";
import { IOption } from "../dropdown/Dropdown";

type IBasicSelectProps = SelectProps & {
  options: IOption[];
  label?: string;
};

export default function BasicSelect(props: IBasicSelectProps) {
  const { options, label, ...rest } = props;
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select {...rest} label={label}>
        {options.map((option, i) => (
          <MenuItem key={i} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
