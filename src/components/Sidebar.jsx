import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthContext } from "../context/AuthProvider";
import { sidebarLinks } from "../constants";
import { Link, useLocation, NavLink, useNavigate } from "react-router-dom";
import { useSignOutAccount } from "../lib/react-query/queries";
import { INITIAL_USER } from "../context/AuthProvider";
import Loader from "./Loader";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signout } = useSignOutAccount();
  const navigate = useNavigate();
  const {user,setUser,setIsAuthenticated,isLoading} = useAuthContext();

  const handlelogout= async (e)=>{
    e.preventDefault();
    signout();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/signin")
  }
  
  return (
   <Box 
   as ="nav"
   className="h-full"
    display={{
        base: "none",
        md: "none",
        lg:"flex"
      }}
      position={"fixed"}
      zIndex={50}
      bg="black"
     
   >
     <Box
      as="div"
    
      height={"full"}
      py="1rem"
      px="1rem"
       width={"25%"}
      display={{
        base: "none",
        md: "flex",
      }}
      className=" flex flex-col gap-4   justify-between min-w-[270px] bg-dark-2"
    >
      <div className="flex flex-col gap-14">
        <Link to={"/"}>
          <div>
            {/* <img src="/public/images/logo.svg" alt="logo" /> */}
            <img src="/images/logo.svg" alt="logo" />
          </div>
        </Link>

        {isLoading ?(
            <div>
                <Loader/>
            </div>
        ):(
            <Link to={`/profile/${user?.id}`}>
          <div className="flex  gap-3 items-center">
            <img
              // src={user?.imageUrl || "/public/icons/profile-placeholder.svg"}
              src={user?.imageUrl || "/icons/profile-placeholder.svg"}
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
        )}

        <ul>
          <div className="flex flex-col justify-between gap-4 ">
            {sidebarLinks?.map((link) => {
              const isactive = pathname === link.route;

              return (
                <li key={link.label}>
                  <NavLink
                    to={link.route}
                    className={({ isActive }) =>
                      `flex  justify-start gap-2  items-center  rounded-md ${
                        isActive ? "bg-purple-500" : ""
                      }`
                    }
                    style={{
                      padding: "8px 8px",
                    }}
                  >
                    <img
                      src={link.imgURL}
                      alt={link.label}
                      width={16}
                      height={16}
                      className={isactive ? "invert brightness-0 filter" : ""}
                    />
                    <Text
                      textAlign="center"
                      fontWeight="400"
                      letterSpacing="0.05rem"
                      fontSize="0.7rem"
                    >
                      {link.label}
                    </Text>
                  </NavLink>
                </li>
              );
            })}
          </div>
        </ul>

       
      </div>
       <Button background={"inherit"} alignSelf={"flex-start"} onClick={handlelogout}>
          {/* <img src="/public/icons/logout.svg" alt="logout" /> */}
          <img src="/icons/logout.svg" alt="logout" />
        </Button>
    </Box>
   </Box>
  );
};

export default Sidebar;
