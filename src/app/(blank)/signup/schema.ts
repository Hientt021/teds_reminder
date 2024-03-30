import { object, string } from "yup";
export const signUpSchema = object({
  email: string().max(15, "Must be 15 characters or less").required("Required"),
  userName: string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  password: string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
});
