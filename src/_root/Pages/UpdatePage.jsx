import React from "react";
import { useParams } from "react-router-dom";
import { useGetPostById } from "../../lib/react-query/queries";
import PostForm from "../../components/forms/PostForm";
import { Box, Heading } from "@chakra-ui/react";
import { Loader } from "../../components";

const UpdatePage = () => {
  const { postId } = useParams();
  console.log(postId);

  const { data: post, isLoading: isGettingPost } = useGetPostById({ postId });
  console.log(post);

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
      display={"flex"}
      flexDir={"column"}
      gap="4rem"
    >
      <div className="flex flex-col gap-15">
        <Heading
          as="h1"
          fontWeight={"700"}
          letterSpacing={"0.05rem"}
          className="text-white "
        >
          Update Post
        </Heading>

        {isGettingPost ? <Loader /> : <PostForm action="Update" post={post} />}
      </div>
    </Box>
  );
};

export default UpdatePage;
