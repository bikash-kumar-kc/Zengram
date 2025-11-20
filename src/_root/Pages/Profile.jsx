import React, { useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
import { useLocation } from "react-router-dom";
import {
  useGettingAllPostsByUserId,
  useGetUserById,
} from "../../lib/react-query/queries";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { LikedPosts, Loader, Posts } from "../../components";

const StateBlock = ({ value, label }) => (
  <div className="flex-center gap-2">
    <Text as="p" textAlign={"center"} color={"#d4d4d4"}>
      {value}
    </Text>
    <Text as="p" textAlign={"center"} color={"#525252"}>
      {label}
    </Text>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { pathname } = useLocation();
  const [isFollowed, setIsFollowed] = useState(false);

  const { data: currenUser, isLoading: gettingCurrrentUser } = useGetUserById({
    userId: id,
  });
  const { data: allPosts, isLoading: gettingAllPostsByUserId } =
    useGettingAllPostsByUserId({ creator: id });
  console.log(allPosts);

  //   const {data:postById,isLoading:gettingPostByUserId} = useGet

  if (!currenUser || gettingCurrrentUser || gettingAllPostsByUserId) {
    return (
      <div className="flex  flex-1 justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <Box
      as="div"
      mt="4rem"
      p="2rem"
      width={{
        base: "100%",
      }}
      display={"flex"}
      flexDir={"column"}
      gap="2rem"
    >
      <Box as="div">
        <Box as="div" display={"flex"} flexDir={"column"} gap="2rem">
          <Box
            as="div"
            width={"100%"}
            display={"flex"}
            gap="1rem"
            alignItems={"center"}
          >
            <img
              // src={
              //   currenUser.imageUrl || "/public/icons/profile-placeholder.svg"
              // }
               src={
                currenUser.imageUrl || "/icons/profile-placeholder.svg"
              }
              alt="profile-picture"
              className="w-28 h-28 rounded-full"
            />
            <Box as="div" className="flex flex-col gap-1">
              <Heading
                as="h1"
                fontWeight={"bold"}
                color={"#10b981"}
                letterSpacing={"0.05rem"}
              >
                {currenUser.name}
              </Heading>
              <Text
                as="p"
                fontSize={"10px"}
                color={"#a3a3a3"}
                textAlign={"center"}
              >
                @{currenUser.userName}
              </Text>
            </Box>
          </Box>

          <Box as="div" className="flex flex-col gap-4">
            <Box as="div" display={"flex "} gap="2rem">
              <StateBlock value={allPosts.rows.length} label="Posts" />
              <StateBlock value={30} label="Followers" />
              <StateBlock value={30} label="Following" />
            </Box>

            <Text as="p" color={"#737373"} fontSize={"1rem"}>
              {currenUser.bio}
            </Text>
          </Box>

          <Box
            as="div"
            className="flex justify-between items-center"
            width={{
              base: "full",
            }}
          >
            <Box
              as="div"
              className={`${user.id !== currenUser.$id && "hidden"} `}
            >
              <Link
                to={`/edit-profile/${currenUser.$id}`}
                className="flex gap-2"
              >
                <img
                  // src={"/public/icons/edit.svg"}
                  src={"/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />

                <Text as="p" letterSpacing={"0.05rem"} color={"#e5e5e5"}>
                  Edit Profile
                </Text>
              </Link>
            </Box>

            <Box as="div" className={`${user.id == id && "hidden"}`}>
              <Button
                letterSpacing={"0.05rem"}
                bg={isFollowed ? "#16a34a" : "#e11d48"}
                onClick={() => setIsFollowed((prev) => !prev)}
                textAlign={"center"}
                width={"80px"}
              >
                Follow
              </Button>
            </Box>
          </Box>
        </Box>
        <Box as="div" mt={"2rem"} className="flex gap-40">
          <Box
            as="div"
            // className={`flex ${
            //   pathname == `/profile/${id}/posts/${id}` && "bg-purple-500"
            // }`}
             className={`flex ${
              pathname == `/profile/${id}/posts/${id}` && "bg-purple-500"
            }`}
            px="0.5rem"
            py="0.5rem"
            borderRadius={"10px"}
          >
            <Link
              to={`/profile/${id}/posts/${id}`}
              className={`flex justify-center rounded-2xl items-center  gap-2 `}
            >
              <img
                // src={"/public/icons/posts.svg"}
                src={"/icons/posts.svg"}
                width={30}
                alt="posts"
                className={`${
                  pathname == `/profile/${id}/posts/${id}` &&
                  "invert brightness-0 filter"
                }`}
              />
              <p
                className={`text-[#a3a3a3] ${
                  pathname == `/profile/${id}/posts/${id}` &&
                  "invert brightness-0 filter"
                } `}
              >
                {" "}
                Posts
              </p>
            </Link>
          </Box>

          <Box
            as="div"
            className={`flex  ${
              pathname == `/profile/${id}/likePosts/${id}` && "bg-purple-500"
            } `}
            px="0.5rem"
            borderRadius={"10px"}
          >
            <Link
              to={`/profile/${id}/likePosts/${id}`}
              className={`flex justify-center rounded-2xl items-center gap-2 `}
            >
              <img
                // src={"/public/icons/like.svg"}
                 src={"/icons/like.svg"}
                alt="like"
                width={30}
                height={20}
                className={`${
                  pathname == `/profile/${id}/likePosts/${id}` &&
                  "invert brightness-0 filter"
                }`}
              />
              <p
                className={`text-[#a3a3a3] ${
                  pathname == `/profile/${id}/likePosts/${id}` &&
                  "invert brightness-0 filter"
                } `}
              >
                Liked Posts
              </p>
            </Link>
          </Box>
        </Box>
      </Box>

      <Box width={"100%"}>
        <Routes>
          <Route path="posts/:id" element={<Posts />} />
          <Route path="likePosts/:id" element={<LikedPosts />} />
        </Routes>
      </Box>

      <Text
        as="p"
        textAlign={"center"}
        letterSpacing={"0.05rem"}
        color="#525252"
      >
        Hey User, follow features are currently unavailable...{" "}
      </Text>
    </Box>
  );
};

export default Profile;
