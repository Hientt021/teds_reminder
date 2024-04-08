import { array, object, string } from "yup";
export const createProjectSchema = object({
  title: string().required("Required"),
  status: string().required("Required"),
  members: array().of(string()),
});
