import { Box } from "@chakra-ui/react";
import React from "react";

const LikedPosts = () => {
  return (
    <Box
      as="div"
      p={"1rem"}
      width={{
        base: "100%",
        md: "75%",
        lg: "50%",
      }}
      color={"#525252"}
      mt="4rem"
      textAlign={"center"}
    >
      <h1>
        this media does not show people interests , you can not read people...
      </h1>
    </Box>
  );
};

export default LikedPosts;
