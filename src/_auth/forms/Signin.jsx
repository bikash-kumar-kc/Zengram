import {
  Stack,
  Field,
  Input,
  Button,
  Box,
  Text,
  Heading,
} from "@chakra-ui/react";
import { Form, Formik, Field as FormikField } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { validationforlogin } from "../../lib/validation";
import { toast } from "react-toastify";
import { useSignInAccount } from "../../lib/react-query/queries";
import { useAuthContext } from "../../context/AuthProvider";
import Loader from "../../components/Loader";

const Signin = () => {
  const { checkAuthUser, isLoading: isUserLoading } = useAuthContext();

  const {
    mutateAsync: signInAccount,
    isPending,
    isError,
    error,
  } = useSignInAccount();
  return (
    <div className="  flex flex-1 justify-center items-center flex-col gap-4">
      <div>
        {/* <img src="/public/images/logo.svg" alt="logo" /> */}
        <img src="/images/logo.svg" alt="logo" />
      </div>

      <div className="flex flex-col gap-2">
        <Heading as="h2" className="text-center">
          Log in to your account
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

        {isError && (
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
            {error.message}
          </Text>
        )}
      </div>

      <div className="w-80">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            const session = await signInAccount({
              email: values.email,
              password: values.password,
            });
            console.log("login successfully");

            if (!session) {
              toast.error("problem in logging");
              return;
            }

            console.log(session);

            const isLoggedIn = await checkAuthUser();

            if (isLoggedIn) {
              resetForm();
              navigator("/");
            } else {
              toast.error("logged in failed. Please try again");
              return;
            }
          }}
          validationSchema={validationforlogin}
        >
          <Form>
            <Stack display={"flex"} flexDir="column" gap="2rem">
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
                      name="password"
                      outline={"none"}
                      border="none"
                      bg="#171717"
                      height={"3rem"}
                      transition={"0.1s"}
                      _focus={{
                        boxShadow: "0 0  10px #22c55e",
                        borderColor: "#22c55e", // Required for consistent focus effect
                        outline: "none", // Remove default outline
                      }}
                    />
                    <Field.ErrorText>{meta.error}</Field.ErrorText>
                  </Field.Root>
                )}
              </FormikField>

              <Stack gap={"2rem"}>
                <Box>
                  <Button
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
                    disabled={isPending || isUserLoading}
                    type="submit"
                  >
                    {isPending || isUserLoading ? (
                      <div className=" flex flex-center gap-2">
                        <Loader /> Loading...
                      </div>
                    ) : (
                      "Log in"
                    )}
                  </Button>
                </Box>

                <Box display={"flex"}>
                  <Text color={"#e5e5e5"}>Don't have an account? </Text>

                  <Link to="/signup">
                    <Text as="span" color="#7c3aed">
                      Sign up
                    </Text>
                  </Link>
                </Box>
              </Stack>
            </Stack>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signin;
