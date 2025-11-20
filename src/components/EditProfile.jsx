import { Box, Button, Field, Heading, Input, Textarea } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useEditProfile, useGetUserById } from "../lib/react-query/queries";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from ".";
import { Form, Formik, Field as FormikField } from "formik";
import { validationforeditprofile } from "../lib/validation";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { id } = useParams();
  const {
    data: user,
    isLoading: gettingUser,
    isError: isErrorGetUser,
    error: errorUser,
  } = useGetUserById({ userId: id });
  const {
    mutateAsync: editProfile,
    isPending: editingProfile,
    isError: isErrorProfile,
    error: errorEdit,
  } = useEditProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (isErrorGetUser && errorUser) {
      toast.error(errorUser?.message || "Failed to get user");
    }

    if (isErrorProfile && errorEdit) {
      toast.error(errorEdit?.message || "Failed to edit profile");
    }
  }, [isErrorGetUser, errorUser, isErrorProfile, errorEdit]);

  return (
    <Box
      as="div"
      mt="4rem"
      px="1rem"
      width={{
        base: "100%",
        md: "75",
        lg: "50%",
      }}
    >
      <Box as="div" className="flex flex-1 gap-2 cursor-pointer ">
        <img
          // src="/public/icons/edit.svg"
           src="/icons/edit.svg"
          alt="edit profile"
          width={25}
          height={25}
        />
        <Heading as="h1" fontWeight={"bold"} letterSpacing={"0.05rem"}>
          Edit Profile
        </Heading>
      </Box>

      {gettingUser ? (
        <Box
          display={"flex"}
          width={"full"}
          height={"full"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Loader />
        </Box>
      ) : (
        <>
          <Box mt="4rem">
            <Formik
              initialValues={{
                bio: user.bio ? user.bio : "",
                userName: user.userName ? user.userName : "",
              }}
              onSubmit={(values, { resetForm }) => {
                if (
                  values.bio === user.bio &&
                  values.userName === user.userName
                ) {
                  console.log("no need to update prfile");
                } else {
                  const update = editProfile({
                    bio: values.bio,
                    userName: values.userName,
                    userId: id,
                  });
                  if (!update) {
                    toast.error("problem in updating profile");
                    return;
                  }
                }

                resetForm();
                navigate(`/profile/${id}`);
              }}
              validationSchema={validationforeditprofile}
            >
              <Form>
                <Box
                  as="div"
                  width={"100%"}
                  display={"flex"}
                  flexDir={"column"}
                  gap="2rem"
                >
                  <FormikField name="userName">
                    {({ field, meta }) => (
                      <Field.Root invalid={!!(meta.touched && meta.error)}>
                        <Field.Label
                          color="#f5f5f5"
                          mb="0.1rem"
                          letterSpacing={"0.05rem"}
                          fontSize="14px"
                          fontWeight={"bold"}
                        >
                          User Name
                        </Field.Label>
                        <Input
                          {...field}
                          name="userName"
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
                  <FormikField name="bio">
                    {({ field, meta }) => (
                      <Field.Root invalid={!!(meta.touched && meta.error)}>
                        <Field.Label
                          color="#f5f5f5"
                          mb="0.1rem"
                          letterSpacing={"0.05rem"}
                          fontSize="14px"
                          fontWeight={"bold"}
                        >
                          Bio
                        </Field.Label>
                        <Textarea
                          {...field}
                          name="bio"
                          bg="#171717"
                          border="none"
                          height={"10rem"}
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
                  <Button
                    type="submit"
                    _hover={{
                      bg: "green.600",
                    }}
                    alignSelf={"flex-end"}
                    bg="green.500"
                    disabled={editingProfile}
                  >
                    {editingProfile ? (
                      <div className="flex flex-1 gap-2">
                        <Loader /> updating...
                      </div>
                    ) : (
                      "Edit Profile"
                    )}
                  </Button>
                </Box>
              </Form>
            </Formik>
          </Box>
        </>
      )}
    </Box>
  );
};

export default EditProfile;
