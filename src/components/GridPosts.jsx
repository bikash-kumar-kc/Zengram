import { Box } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { PostStat } from ".";
import { useDeletePost, useGetUserById } from "../lib/react-query/queries";
import { useAuthContext } from "../context/AuthProvider";

const GridPosts = ({ user, post, userId, isdelete }) => {
  const { data: postUser, isLoading: gettingPostUser } = useGetUserById({
    userId: post?.creator,
  });

  const { user: currentUser } = useAuthContext();

  console.log(currentUser?.id === post?.creator);

  const { mutateAsync: deletePost } = useDeletePost();

  const handleDeletePost = async () => {
    await deletePost({
      postId: post?.$id,
      imageId: post?.imageId,
      userId: userId,
    });
  };

  return (
    <Box as="div" mt="2rem">
      <div className="flex flex-col gap-2">
        <Link to={`/profile/${user?.id}`}>
          <Box
            as="div"
            width={{
              base: "100%",
              md: "400px",
            }}
            mb="1rem"
          >
            <img
              src={post?.imageUrl}
              alt="postImage"
              height={"300px"}
              width={"full"}
              className="rounded-2xl object-contain"
            />
          </Box>
        </Link>

        <Box as="div" className="flex items-center gap-2">
          <div className="flex items-center justify-start gap-2 flex-1">
            <img
              // src={
              //   postUser?.imageUrl || "/public/icons/profile-placeholder.svg"
              // }
               src={
                postUser?.imageUrl || "/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-8 h-8 rounded-full"
            />
            <p className="line-clamp-1">{postUser?.name}</p>
          </div>

          <Box display={"flex"} gap="2rem">
            <PostStat post={post} userId={user?.id || userId} space={true} />
            {currentUser?.id === post?.creator && isdelete && (
              <Box>
                <img
                  // src="/public/icons/delete.svg"
                   src="/icons/delete.svg"
                  alt="delete"
                  onClick={handleDeletePost}
                />
              </Box>
            )}
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default GridPosts;
