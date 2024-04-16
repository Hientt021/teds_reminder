"use client";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

export type IDatePickerComponentProps = DatePickerProps<Dayjs> & {};

export default function DatePickerComponent(props: IDatePickerComponentProps) {
  const { ...rest } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker {...rest} />
    </LocalizationProvider>
  );
}
