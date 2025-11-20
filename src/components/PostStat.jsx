import React, { useEffect, useState } from "react";
import {
  useDeleteSavePost,
  useGetCurrentUser,
  useGetSavePost,
  useSavePost,
  useUpdateLikePost,
} from "../lib/react-query/queries";
import { checkIsLiked } from "../lib/utils";
import { Text } from "@chakra-ui/react";
import { Loader } from ".";

const PostStat = ({ post, userId, space }) => {
  const [save, setSave] = useState(false);

  const likesList = post?.likes.map((user) => user);

  const [likes, setLikes] = useState(likesList);

  const { data: saveposts } = useGetSavePost({ userId });
  const saved = saveposts?.rows.find((each) => each.postId === post.$id);
  const savePostId = saved?.$id;

  const { data: currentUser } = useGetCurrentUser();

  const { mutate: likePost } = useUpdateLikePost();
  const { mutateAsync: savePost, isPending: isSavingPost } = useSavePost();
  const { mutateAsync: deletePost, isPending: isDeletingPost } =
    useDeleteSavePost();

  useEffect(() => {
    setSave(!!savePostId);
  }, [currentUser, saveposts]);

  const handleLikePost = (e) => {
    e.stopPropagation();

    let likeArray = [...likes];

    if (likeArray.includes(userId)) {
      likeArray = likeArray.filter((each) => each !== userId);
    } else {
      likeArray.push(userId);
    }

    setLikes(likeArray);
    likePost({ postId: post.$id, likearray: likeArray });
  };

  const handleSavePost = async (e) => {
    e.stopPropagation();

    if (save && savePostId) {
      await deletePost({ savePostId, postId: post?.$id });
      setSave(false);
      return;
    }

    await savePost({ userId, postId: post.$id });

    setSave(true);
  };

  return (
    <div className={space ? " flex gap-2" : "flex justify-between  "}>
      <div className="flex gap-1">
        <img
          // src={`${
          //   checkIsLiked(likes, userId)
          //     ? "/public/icons/liked.svg"
          //     : "/public/icons/like.svg"
          // }`}
          src={`${
            checkIsLiked(likes, userId)
              ? "/icons/liked.svg"
              : "/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />

        <Text as="p" color={"#525252"}>
          {likes?.length}
        </Text>
      </div>

      <div>
        {isDeletingPost || isSavingPost ? (
          <div>
            <Loader />
          </div>
        ) : (
          <img
            // src={save ? "/public/icons/saved.svg" : "/public/icons/save.svg"}
            src={save ? "/icons/saved.svg" : "/icons/save.svg"}
            alt="share"
            width={20}
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStat;
