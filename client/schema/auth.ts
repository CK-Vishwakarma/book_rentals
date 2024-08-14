import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: Yup.string().max(255).required("Password is required"),
});
export const registrationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: Yup.string()
    .max(255)
    .required("Password is required"),
  firstName: Yup.string()
    .max(255)
    .required("First name is required"),
  lastName: Yup.string()
    .max(255)
    .required("Last name is required"),
});