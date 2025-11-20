import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useGettingAllUsers } from "../../lib/react-query/queries";
import { Link } from "react-router-dom";
import { Loader } from "../../components";

const People = () => {
  const { data: allUsers, isLoading: gettingAllUser } = useGettingAllUsers();
  console.log(allUsers);
  return (
    <Box as="div" mt="4rem" width={"50%"} px="1rem">
      <div>
        <Heading
          as="h1"
          fontWeight={"700"}
          letterSpacing={"0.05rem"}
          className="text-white "
        >
          People
        </Heading>
      </div>

      {gettingAllUser ? (
        <Box
          as="div"
          mt="4rem"
          height={"100$"}
          display={"flex"}
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Loader />
        </Box>
      ) : (
        <Box as="div" mt="4rem" display={"flex"} flexDir={"column"} gap="3rem">
          {allUsers?.rows.map((user) => (
            <Box as="div" key={user.name}>
              <Link to={`/profile/${user?.$id}`}>
                <div className="flex  gap-3 items-center">
                  <img
                    // src={
                    //   user?.imageUrl || "/public/icons/profile-placeholder.svg"
                    // }
                     src={
                      user?.imageUrl || "/icons/profile-placeholder.svg"
                    }
                    className="w-10 h-10 rounded-full"
                    alt="profile"
                  />
                  <div>
                    <Text as="p" letterSpacing={"0.05rem"} fontSize={"0.8rem"}>
                      {user?.name}
                    </Text>
                    <Text as="p" fontSize={"10px"} color={"#525252"}>
                      @{user?.name}
                    </Text>
                  </div>
                </div>
              </Link>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default People;
