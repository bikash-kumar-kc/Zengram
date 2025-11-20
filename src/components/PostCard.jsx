import React from "react";
import { useAuthContext } from "../context/AuthProvider";
import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useGetUserById } from "../lib/react-query/queries";
import { multiFormatDateString } from "../lib/utils";
import { Loader, PostStat } from ".";

const PostCard = ({ post }) => {
  const { user } = useAuthContext();

  const { data: postUser, isLoading: gettingPostUser } = useGetUserById({
    userId: post?.creator,
  });

  if (!post.creator) return;

  return (
    <Box as="div" marginTop={"4rem"} p="0.4rem">
      <Box as="div" display={"flex"} flexDir={"column"} gap="0.5rem">
        <Box
          as="div"
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {gettingPostUser ? (
            <Loader />
          ) : (
            <>
              <Box as="div" display={"flex"} gap="0.7rem" alignItems={"center"}>
                <Link to={`/profile/${postUser?.$id}`}>
                  <img
                    // src={
                    //   postUser?.imageUrl ||
                    //   "/public/icons/profile-placeholder.svg"
                    // }
                    src={
                      postUser?.imageUrl ||
                      "/icons/profile-placeholder.svg"
                    }
                    alt="creator"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </Link>

                <Box
                  as="div"
                  display={"flex"}
                  flexDir={"column"}
                  justifyContent={"center"}
                  gap="0.1rem"
                >
                  <Text
                    as="p"
                    fontWeight={"bold"}
                    letterSpacing={"0.05rem"}
                    fontSize={"0.8rem"}
                  >
                    {postUser?.name}
                  </Text>
                  <Box as="div" display="flex">
                    <Text
                      as="p"
                      mr="0.2rem"
                      fontSize={"0.7rem"}
                      color={"#737373"}
                    >
                      {multiFormatDateString(post.$createdAt)} .{" "}
                    </Text>
                    <Text as="p" fontSize={"0.7rem"} color={"#737373"}>
                      {" "}
                      {post.location}
                    </Text>
                  </Box>
                </Box>
              </Box>

              <Box as="div">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user?.id !== postUser?.$id && "hidden"} `}
                >
                  <img
                    // src={"/public/icons/edit.svg"}
                     src={"/icons/edit.svg"}
                    alt="edit"
                    width={20}
                    height={20}
                  />
                </Link>
              </Box>
            </>
          )}
        </Box>

        <Link to={`#`}>
          <Box display={"flex"} flexDir={"column"}>
            <Box
              as="div"
              display={"flex"}
              flexDir={"column"}
              gap="0.3rem"
              mb="0.5rem"
            >
              <Text
                as="p"
                textAlign={"start"}
                letterSpacing={"0.05rem"}
                color={"#d4d4d4"}
                fontSize={"14px"}
              >
                {post.caption}
              </Text>
              <ul>
                {post.tags.map((tag) => (
                  <li key={tag} className="text-[#525252]">
                    #{tag}
                  </li>
                ))}
              </ul>
            </Box>
            <Box
              as="div"
              width={{
                base: "100%",
                md: "400px",
              }}
              mb="1rem"
            >
              <img
                // src={post.imageUrl || "/public/icons/profile-placeholder.svg"}
                 src={post.imageUrl || "/icons/profile-placeholder.svg"}
                alt="post image"
                height={"300px"}
                width={"full"}
                className="rounded-2xl object-contain"
              />
            </Box>
          </Box>
        </Link>

        <PostStat post={post} userId={user?.id} />
      </Box>
    </Box>
  );
};

export default PostCard;
