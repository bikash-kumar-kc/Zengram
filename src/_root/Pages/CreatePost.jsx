import { Box, Text } from "@chakra-ui/react";
import React from "react";
import PostForm from "../../components/forms/PostForm";

const CreatePost = () => {
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
      <Box as="div" className="flex flex-row gap-2 items-center ">
        <img
          // src="/public/icons/gallery-add.svg"
          src="/icons/gallery-add.svg"
          width={30}
          height={30}
          alt="create post"
        />
        <Text as="p" fontWeight={"bold"} letterSpacing={"0.05rem"}>
          {" "}
          Create Post
        </Text>
      </Box>

      <PostForm action="create" />
      <Text as="p" height={"100px"} color="black">
        Enjoy Creating Post...
      </Text>
    </Box>
  );
};

export default CreatePost;
