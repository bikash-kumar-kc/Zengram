import React from "react";
import {
  Heading,
  Stack,
  Flex,
  Button,
  Field,
  Text,
  Input,
} from "@chakra-ui/react";
import { Form, Formik, Field as FormikField } from "formik";
import { Link, useNavigate } from "react-router";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "../../lib/react-query/queries";
import { useAuthContext } from "../../context/AuthProvider";
import Loader from "../../components/Loader";
import { validationforsignup } from "../../lib/validation";

const Signup = () => {
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useAuthContext();
  const {
    mutateAsync: userSignup,
    isPending: isusersignup,
    isError: isErrorSignup,
    error: signupError,
  } = useCreateUserAccount();
  const {
    mutateAsync: userSignin,
    isError: isErrorSignin,
    error: signinError,
  } = useSignInAccount();

  return (
    <div className="  flex flex-1 justify-center items-center flex-col gap-4">
      <div>
        {/* <img src="/public/images/logo.svg" alt="logo" /> */}
        <img src="/images/logo.svg" alt="logo" />
      </div>

      <div className="flex flex-col gap-2">
        <Heading as="h2" className="text-center">
          Sign up to your account
        </Heading>
        <Text
          as="p"
          className="text-center"
          fontSize={"0.9rem"}
          fontWeight={"bold"}
          color="#737373"
        >
          Welcome back! Please enter your details.
        </Text>
        {isErrorSignup ||
          (isErrorSignin && (
            <Text
              as="p"
              className="text-center"
              fontSize={"0.9rem"}
              fontWeight={"bold"}
              color="red"
              alignSelf={"center"}
              width={{
                base: "100%",
                md: "60%",
              }}
            >
              {signupError.message || signinError.message}
            </Text>
          ))}
      </div>

      <div className="w-80">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              const usercreate = await userSignup({
                name: values.name,
                email: values.email,
                password: values.password,
              });

              console.log("here,");

              if (!usercreate) {
                toast.error("problem in creating user...");
                return;
              }

              const session = await userSignin({
                email: values.email,
                password: values.password,
              });

              if (!session) {
                toast.error("problem in logging");
                navigate("/signin");
                return;
              }

              const isLoggedin = await checkAuthUser();
              console.log(isLoggedin);
              if (isLoggedin) {
                resetForm();
                navigate("/");
              } else {
                toast("user logged in successfully");
                return;
              }
            } catch (error) {
              console.log(error);
            }
          }}
          validationSchema={validationforsignup}
        >
          <Form>
            <Stack display={"flex"} flexDir="column" gap="2rem">
              <Flex
                gap="1rem"
                flexDir={{
                  base: "column",
                  lg: "row",
                }}
              >
                <FormikField name="name">
                  {({ field, meta }) => (
                    <Field.Root invalid={!!(meta.touched && meta.error)}>
                      <Field.Label
                        name="name"
                        color="#f5f5f5"
                        mb="0.1rem"
                        letterSpacing={"0.05rem"}
                        fontSize="14px"
                        fontWeight={"bold"}
                      >
                        Name
                      </Field.Label>
                      <Input
                        {...field}
                        type="text"
                        name="name"
                        bg="#171717"
                        border="none"
                        height={"3rem"}
                        outline="none"
                        transition={"0.1s"}
                        _focus={{
                          boxShadow: "0 0  10px #22c55e",
                          borderColor: "#22c55e",
                          outline: "none",
                        }}
                      />
                      <Field.ErrorText>{meta.error}</Field.ErrorText>
                    </Field.Root>
                  )}
                </FormikField>
              </Flex>
              <FormikField name="email">
                {({ field, meta }) => (
                  <Field.Root invalid={!!(meta.touched && meta.error)}>
                    <Field.Label
                      name="email"
                      color="#f5f5f5"
                      mb="0.1rem"
                      letterSpacing={"0.05rem"}
                      fontSize="14px"
                      fontWeight={"bold"}
                    >
                      Email
                    </Field.Label>
                    <Input
                      {...field}
                      name="email"
                      type="email"
                      bg="#171717"
                      border="none"
                      height={"3rem"}
                      outline="none"
                      transition={"0.1s"}
                      _focus={{
                        boxShadow: "0 0  10px #22c55e",
                        borderColor: "#22c55e",
                        outline: "none",
                      }}
                    />
                    <Field.ErrorText>{meta.error}</Field.ErrorText>
                  </Field.Root>
                )}
              </FormikField>

              <FormikField name="password">
                {({ field, meta }) => (
                  <Field.Root invalid={!!(meta.touched && meta.error)}>
                    <Field.Label
                      color="#f5f5f5"
                      mb="0.1rem"
                      letterSpacing={"0.05rem"}
                      fontSize="14px"
                      fontWeight={"bold"}
                    >
                      Password
                    </Field.Label>
                    <Input
                      {...field}
                      type="password"
                      bg="#171717"
                      border="none"
                      height={"3rem"}
                      outline="none"
                      transition={"0.1s"}
                      _focus={{
                        boxShadow: "0 0  10px #22c55e",
                        borderColor: "#22c55e",
                        outline: "none",
                      }}
                      name="password"
                    />
                    <Field.ErrorText>{meta.error}</Field.ErrorText>
                  </Field.Root>
                )}
              </FormikField>

              <Button
                type="submit"
                borderRadius={"0.5rem"}
                width={"100%"}
                textAlign={"center"}
                p="1rem"
                bg={"#8b5cf6"}
                color="white"
                fontWeight={"700"}
                fontSize={"0.8rem"}
                _hover={{
                  background: "#7c3aed",
                  color: "white",
                }}
              >
                {isUserLoading || isusersignup ? (
                  <div className="flex flex-center gap-2">
                    <Loader /> Loading...
                  </div>
                ) : (
                  "Sign up"
                )}
              </Button>
              <Text fontSize={"16px"} color="white" textAlign="center">
                Already have an account?{" "}
                <Link to="/signin">
                  <Text as="span" color="#7c3aed">
                    Signin
                  </Text>
                </Link>
              </Text>
            </Stack>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
