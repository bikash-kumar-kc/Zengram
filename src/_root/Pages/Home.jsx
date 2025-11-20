import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useGetRecentPost } from "../../lib/react-query/queries";
import { Loader, PostCard } from "../../components";
import { useAuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";

const Home = () => {
  const {
    data: posts,
    isLoading: isGettingRecentPost,
    isError: isErrorPosts,
  } = useGetRecentPost();

  const { user } = useAuthContext();

  if (isErrorPosts) {
    return <Heading>something bad happened...</Heading>;
  }

  return (
    <Box as="div" mt="4rem" px="1rem">
      <div>
        <Heading
          as="h1"
          fontWeight={"700"}
          letterSpacing={"0.05rem"}
          className="text-white "
        >
          Home Feed
        </Heading>

        {!user?.bio && (
          <Link to={`/edit-profile/${user?.id}`}>
            <Text
              mt="1rem"
              textAlign={"center"}
              color="#525252"
            >{`hey, ${user?.name} update profile. Click here`}</Text>
          </Link>
        )}

        {isGettingRecentPost || !posts ? (
          <Box
            as="div"
            marginTop={"4rem"}
            p="0.4rem"
            className="flex justify-center items-center"
          >
            <Loader />
          </Box>
        ) : (
          <ul>
            {posts?.rows.map((post) => (
              <li key={post.$id}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <Text as="p" height={"100px"}>
        {" "}
      </Text>
    </Box>
  );
};

export default Home;
