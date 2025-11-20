import {
  Box,
  Field,
  Input,
  Stack,
  Button,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { Form, Formik, Field as FormikField } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import FileUploader from "../FileUploader";
import { useCreatePost, useUpdatePost } from "../../lib/react-query/queries";
import { useAuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";
import Loader from "../Loader";
import storage from "../../lib/appwrite/storage";
import { validationforpost } from "../../lib/validation";

const PostForm = ({ post, action }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { mutateAsync: createPost, isPending: isLoadingCreatePost } =
    useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdatePost } =
    useUpdatePost();

  return (
    <Box as="div">
      <Formik
        initialValues={{
          caption: post?.caption || "",
          location: post?.location || "",
          tags: post ? post.tags.join(",") : "",
          image: null, // null for a single file and empty array for muntiple file
        }}
        onSubmit={async (values, { resetForm }) => {
          if (post && action === "Update") {
            if (values.image) {
              const fileid = post.imageId;
              console.log(fileid);
              const deleteFile = await storage.deleteFile(fileid);
              if (deleteFile) {
                console.log("file delete successfully:: ");
              }
            }

            const update = await updatePost({
              creator: user?.id,
              caption: values.caption,
              location: values.location,
              tags: values.tags,
              file: values.image ? values.image : null,
              postId: post.$id,
            });

            if (!update) {
              toast.error("problem in updating post:: ");
              return;
            }

            resetForm();
          } else {
            const newPost = await createPost({
              creator: user?.id,
              caption: values.caption,
              location: values.location,
              tags: values.tags,
              file: values.image,
            });

            if (!newPost) {
              toast.error("problem in creating post: ");
              return;
            }
          }

          resetForm();
          navigate("/");
        }}
        validationSchema={validationforpost}
      >
        <Form>
          <Stack display={"flex"} flexDir="column" gap="3rem">
            <FormikField name="caption">
              {({ field, meta }) => (
                <Field.Root invalid={!!(meta.touched && meta.error)}>
                  <Field.Label
                    name="caption"
                    color="#f5f5f5"
                    letterSpacing={"0.05rem"}
                    fontSize="14px"
                    fontWeight={"bold"}
                    marginBottom="1rem"
                  >
                    Captions
                  </Field.Label>
                  <Textarea
                    {...field}
                    name="caption"
                    height={"200px"}
                    border={"none"}
                    outline="none"
                    transition={"0.5s"}
                    _focus={{
                      boxShadow: "0 0  10px #22c55e",
                      borderColor: "#22c55e",
                      outline: "none",
                    }}
                    bg="#171717"
                    p="1rem"
                  />
                  <Field.ErrorText>{meta.error}</Field.ErrorText>
                </Field.Root>
              )}
            </FormikField>

            <FormikField name="image">
              {({ setFieldValue, field, meta, form }) => (
                <Field.Root invalid={!!(meta.touched && meta.error)}>
                  <Field.Label
                    color="#f5f5f5"
                    letterSpacing={"0.05rem"}
                    fontSize="14px"
                    fontWeight={"bold"}
                    marginBottom="1rem"
                  >
                    Add Photos
                  </Field.Label>
                  <FileUploader
                    name={field.name}
                    fieldChange={(files) =>
                      form.setFieldValue(field.name, files[0])
                    }
                    mediaUrl={post?.imageUrl}
                  />
                  <Field.ErrorText>{meta.error}</Field.ErrorText>
                </Field.Root>
              )}
            </FormikField>

            <FormikField name="location">
              {({ field, meta }) => (
                <Field.Root invalid={!!(meta.touched && meta.error)}>
                  <Field.Label
                    color="#f5f5f5"
                    letterSpacing={"0.05rem"}
                    fontSize="14px"
                    fontWeight={"bold"}
                    marginBottom="1rem"
                  >
                    Add Location
                  </Field.Label>
                  <Input
                    {...field}
                    type="text"
                    name="location"
                    outline={"none"}
                    border="none"
                    transition={"0.5s"}
                    _focus={{
                      boxShadow: "0 0  10px #22c55e",
                      borderColor: "#22c55e",
                      outline: "none",
                    }}
                    bg="#171717"
                    p="1rem"
                  />
                  <Field.ErrorText>{meta.error}</Field.ErrorText>
                </Field.Root>
              )}
            </FormikField>

            <FormikField name="tags">
              {({ field, meta }) => (
                <Field.Root invalid={!!(meta.touched && meta.error)}>
                  <Field.Label
                    color="#f5f5f5"
                    letterSpacing={"0.05rem"}
                    fontSize="14px"
                    fontWeight={"bold"}
                    marginBottom="1rem"
                  >
                    Add Tags
                  </Field.Label>
                  <Input
                    {...field}
                    type="text"
                    name="tags"
                    outline={"none"}
                    border="none"
                    transition={"0.5s"}
                    _focus={{
                      boxShadow: "0 0  10px #22c55e",
                      borderColor: "#22c55e",
                      outline: "none",
                    }}
                    bg="#171717"
                    p="1rem"
                  />
                  <Field.ErrorText>{meta.error}</Field.ErrorText>
                </Field.Root>
              )}
            </FormikField>

            <Box as="div" display={"flex"} justifyContent={"flex-end"} gap={2}>
              <Button
                bg="red.600"
                _hover={{
                  bg: "red.700",
                }}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                bg="green.600"
                _hover={{
                  bg: "green.700",
                }}
                type="submit"
                disabled={isLoadingCreatePost || isLoadingUpdatePost}
              >
                {isLoadingCreatePost || isLoadingUpdatePost ? (
                  <div className=" flex flex-center gap-2">
                    <Loader /> {action === "Update" ? "Updating" : "Creating"}
                  </div>
                ) : (
                  `${action} Post`
                )}
              </Button>
            </Box>

            <Text
              as="p"
              color="#525252"
              height={"100px"}
              letterSpacing={"0.05rem"}
              textAlign={"center"}
              fontSize={"1rem"}
            >
              Add more posts...
            </Text>
          </Stack>
        </Form>
      </Formik>
    </Box>
  );
};

export default PostForm;
