import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import React from "react";
import {
  useGetAllSavePosts,
  useGetSavePost,
} from "../../lib/react-query/queries";
import { useAuthContext } from "../../context/AuthProvider";
import { GridPosts, Loader } from "../../components";

const SavePost = () => {
  const { user } = useAuthContext();

  const { data: savedPosts, isLoading: isLoadingCurrentUserSavePosts } =
    useGetSavePost({ userId: user?.id });

  const savePostIds = savedPosts?.rows.map((each) => each.postId);

  const postQueries = useGetAllSavePosts(savePostIds);
  const savedPostsData = postQueries.map((q) => q.data).filter(Boolean);

  const isLoading = postQueries.some((q) => q.isLoading);

  return (
    <>
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
        <Box display={"flex"} gap="1rem" alignItems={"center"}>
          <img 
          // src="/public/icons/save.svg"
          src="/icons/save.svg"
           alt="save post" width={30} />
          <Heading
            as="h1"
            fontWeight={"700"}
            letterSpacing={"0.05rem"}
            className="text-white "
          >
            Saved Posts
          </Heading>
        </Box>

        {savedPostsData.length < 1 ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <h1 className="text-[#525252]">no save posts...</h1>
          </div>
        ) : (
          <>
            <Box>
              {isLoadingCurrentUserSavePosts || isLoading ? (
                <div className="flex justify-center items-center">
                  <Loader />
                </div>
              ) : (
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2,1fr)",
                  }}
                  gap="10"
                >
                  {savedPostsData?.map((post) => (
                    <GridPosts key={post.$id} post={post} user={user} />
                  ))}
                </Grid>
              )}
            </Box>
            <Text
              height={"200px"}
              display={{
                base: "block",
                md: "none",
              }}
              color={"#525252"}
              textAlign={"center"}
            >
              save more posts...
            </Text>
          </>
        )}
      </Box>
    </>
  );
};

export default SavePost;
