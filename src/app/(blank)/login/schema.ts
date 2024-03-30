import { object, string } from "yup";
export const loginSchema = object({
  email: string().required("Required"),
  password: string().required("Required"),
});
