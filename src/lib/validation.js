import { object, string } from "yup";
import * as Yup from "yup";

export  const validationforlogin = object({
  password: string().required("Password is required"),
  email: string().email("Email is invalid").required("Email is required"),
  
});


export const validationforsignup = object({
  name: string().required("Name is required"),
  email: string().email("Email is invalid").required("Email is required"),
  password: string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^a-zA-Z0-9]/, 'Password requires a symbol'),
});

export const validationforpost = object({
  caption: string().required("this is required field"),
  tags: string().required("this is required field"),
  location: string().required("this is required field"),
  image: Yup.mixed().required("this is required field"),
});

export const validationforeditprofile = object({
  bio:string().required("this is required field"),
  userName:string()
  .required("Username is required")
  .matches(/^[a-zA-Z][a-zA-Z0-9_]*$/, "Must start with a letter and contain only letters, numbers, and underscores")
  .matches(/^(?!.*__).*$/, "Cannot contain consecutive underscores")
  .min(3, "Must be at least 3 characters")
  .max(20, "Must be at most 20 characters"),
});


