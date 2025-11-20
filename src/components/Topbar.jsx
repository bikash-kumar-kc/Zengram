import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { useAuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useSignOutAccount } from "../lib/react-query/queries";
import { INITIAL_USER } from "../context/AuthProvider";

const Topbar = () => {
  const { user, setIsAuthenticated, setUser, isLoading } = useAuthContext();
  const { mutate: signout } = useSignOutAccount();
  const navigate = useNavigate();

  const handlesignout = async (e) => {
    e.preventDefault();
    setUser(INITIAL_USER);
    setIsAuthenticated(false);
    signout();
    navigate("/signin");
  };
  return (
    <Box
      as="div"
      width={"100%"}
      display={{
        base: "block",
        md: "block",
        lg: "none",
      }}
      py="1rem"
      px="1rem"
      className={"fixed top-0 z-50 bg-dark-2 "}
      bg="black"
    >
      <div className="flex justify-between">
        <Link to="/">
          <div>
            {/* <img src="/public/images/logo.svg" alt="logo" /> */}
            <img src="/images/logo.svg" alt="logo" />
          </div>
        </Link>
        <div>
          <div className="flex flex-1 gap-2 items-center">
            <Button onClick={handlesignout}>
              {/* <img src="/public/icons/logout.svg" alt="logout" /> */}
               <img src="/icons/logout.svg" alt="logout" />
            </Button>
            <Link to={`/profile/${user?.id}`}>
              <Box
                as="img"
                // src={user?.imageUrl || "/assests/icon/profile-placeholder.svg"}
                 src={user?.imageUrl || "/icon/profile-placeholder.svg"}
                alt="profile"
                className=" rounded-full"
                width="3rem"
              />
            </Link>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Topbar;
