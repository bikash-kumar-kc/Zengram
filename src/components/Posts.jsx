import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import {
  useGettingAllPostsByUserId,
  useGetUserById,
} from "../lib/react-query/queries";
import { GridPosts, Loader } from ".";

const Posts = () => {
  const { id } = useParams();
  const { data: allPosts, isLoading: gettingAllPostsByUserId } =
    useGettingAllPostsByUserId({ creator: id });
  const { data: currenUser } = useGetUserById({
    userId: id,
  });
  console.log(allPosts);
  console.log(currenUser);

  if (gettingAllPostsByUserId) {
    return (
      <div className="flex flex-col  items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Box
        as="div"
        mt="4rem"
        px="1rem"
        display={"flex"}
        width={{
          base: "100%",
          md: "75%",
          lg: "50%",
        }}
        flexDir={"column"}
        gap="2rem"
      >
        <div>
          <Heading
            as="h1"
            fontWeight={"700"}
            letterSpacing={"0.05rem"}
            className="text-white "
          >
            Posts
          </Heading>
        </div>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2,1fr)",
          }}
          gap="6"
        >
          {allPosts?.rows.map((post) => (
            <GridPosts
              key={post?.$id}
              post={post}
              userId={currenUser?.accountId}
              isdelete={true}
            />
          ))}
        </Grid>

        <Text height={"700px"} color={"#525252"} textAlign={"center"}>
          no more posts...
        </Text>

        <Text color="black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          magni incidunt, atque necessitatibus totam nulla deserunt voluptates
          expedita repellendus eos molestias porro consectetur suscipit
          corporis, hic odit aperiam adipisci aut? Amet eos, voluptates
          voluptatum vitae temporibus vel, provident incidunt debitis inventore
          esse aspernatur ullam ipsum minima quidem. Quam, maiores minus!
        </Text>
      </Box>
    </>
  );
};

export default Posts;
