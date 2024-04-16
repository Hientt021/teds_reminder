import dayjs from "dayjs";
import { array, object, string, date, ref, number } from "yup";
export const createProjectSchema = object({
  title: string().required("Title is required"),
});

export const updateProfileSchema = object({
  userName: string().required("Required"),
  email: string().required("Required"),
});
