import { Box, Grid, Heading, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { GridPosts, Loader } from "../../components";
import {
  useGetInfinitePosts,
  useSearchPosts,
} from "../../lib/react-query/queries";

import { useInView } from "react-intersection-observer";

import { useAuthContext } from "../../context/AuthProvider";

const SearchResults = ({ isSearchFetching, searchPosts }) => {
  if (isSearchFetching) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  } else if (searchPosts && searchPosts.rows.length > 0) {
    const { user } = useAuthContext();
    return (
      <Box as="div">
        <Box as="div" display={"flex"} flexDir={"column"} gap={"2rem"}>
          <Grid
            templateColumns={{
              base: "repeat(1,1fr)",
              lg: "repeat(2,1fr)",
            }}
            gap="10"
          >
            {searchPosts.rows.map((post) => (
              <GridPosts key={post.$id} post={post} user={user} />
            ))}
          </Grid>

          <Text as="p" height={"100px"} color="#525252" textAlign={"center"}>
            no more related posts.
          </Text>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box width={"100%"}>
        <Text as="p" color="#525252" textAlign={"center"}>
          No results found
        </Text>
      </Box>
    );
  }
};

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetInfinitePosts();
  const { user } = useAuthContext();

  const [searchValue, setSearchValue] = useState("");

  const debouncedSearch = useDebounce(searchValue, 1000);

  const { data: searchPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedSearch);

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);

  if (!posts)
    return (
      <>
        <div className=" flex justify-center flex-col gap-3 items-center w-full h-full">
          <Loader />
          <Heading
            as="h1"
            fontWeight={"bold"}
            fontSize={"1rem"}
            textAlign={"center"}
            letterSpacing={"0.05rem"}
            color="#404040"
          >
            No posts...{" "}
          </Heading>
        </div>
      </>
    );

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item.rows.length === 0);

  return (
    <>
      <Box
        as="div"
        display={"flex"}
        flexDir={"column"}
        width={{
          base: "100%",
          lg: "75%",
        }}
      >
        <Box
          as="div"
          mt="4rem"
          px="2rem"
          display={"flex"}
          flexDir={"column"}
          gap="2rem"
        >
          <Box as="div">
            <div>
              <Heading
                as="h1"
                fontWeight={"700"}
                letterSpacing={"0.05rem"}
                className="text-white "
              >
                Explore
              </Heading>
            </div>

            <Box
              as="div"
              marginTop={"4rem"}
              display={"flex"}
              justifyContent={"flex-end"}
              width={"100%"}
            >
              <Box
                as="div"
                className="flex rounded-[10px] items-center"
                border={"1px solid #404040"}
                px="0.2rem"
              >
                <label
                  htmlFor="search
          "
                >
                  <img
                    // src={"/public/icons/search.svg"}
                    src={"/icons/search.svg"}
                    alt="search"
                    width={15}
                    height={15}
                  />
                </label>
                <Input
                  as="input"
                  name="search"
                  type="text"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => {
                    const { value } = e.target;
                    console.log(value);
                    setSearchValue(value);
                  }}
                  width="40%"
                  outline="none"
                  border="none"
                  autoFocus={true}
                />
              </Box>
            </Box>
          </Box>

          <Box as="div" display={"flex"} justifyContent={"space-between"}>
            <Heading as="h3" fontWeight={"bold"} letterSpacing={"0.05rem"}>
              Popular Today
            </Heading>

            <Box as="div" display={"flex"} gap="1rem" alignItems={"center"}>
              <Text as="p" fontSize={"14px"} color="#525252">
                All
              </Text>
              <img
                // src="/public/icons/filter.svg"
                src="/icons/filter.svg"
                alt="filter"
                width={20}
                height={20}
              />
            </Box>
          </Box>

          <Box>
            {shouldShowSearchResults ? (
              <>
                <Box>
                  <SearchResults
                    isSearchFetching={isSearchFetching}
                    searchPosts={searchPosts}
                  />
                </Box>
              </>
            ) : shouldShowPosts ? (
              <Text as="p">End of posts</Text>
            ) : (
              <>
                {posts.pages.map((item, index) => (
                  <Grid
                    templateColumns={{
                      base: "repeat(1,1fr)",
                      md: "repeat(2,1fr)",
                    }}
                    gap="10"
                    key={`page-${index}`}
                  >
                    {item.rows.map((post) => (
                      <GridPosts key={post.$id} post={post} user={user} />
                    ))}
                  </Grid>
                ))}
              </>
            )}
          </Box>

          {hasNextPage && !searchValue && (
            <Box
              as="div"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              ref={ref}
              mt="5rem"
            >
              <Loader />
            </Box>
          )}
        </Box>
        <Text as="p" height={"100px"} color="black">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos ab cum
          laudantium consectetur nulla doloremque quam vel reprehenderit,
          quisquam exercitationem! Blanditiis aliquid repellat enim harum
          expedita fugiat nemo maiores asperiores necessitatibus assumenda minus
          culpa, eum neque dignissimos ut natus laudantium rerum! Eos iure vel
          obcaecati voluptatibus ipsa quod omnis beatae?
        </Text>
      </Box>
    </>
  );
};

export default Explore;
