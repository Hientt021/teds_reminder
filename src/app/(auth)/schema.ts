import { object, string } from "yup";
export const loginSchema = object({
  email: string().required("Required"),
  password: string().required("Required"),
});

export const registerSchema = object({
  userName: string().required("Required"),
  email: string().required("Required"),
  password: string().required("Required"),
});
