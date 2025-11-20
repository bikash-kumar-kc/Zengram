import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { bottombarLinks } from "../constants";
import { NavLink, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <Box
      width={"100%"}
      display={{
        base: "block",
        md: "block",
        lg: "none",
      }}
      py={4}
      px={5}
      background={"black"}
      className="z-50 flex flex-between fixed bottom-0 rounded-t-[20px] bg-dark "
    >
      <ul>
        <div className="flex justify-between">
          {bottombarLinks?.map((link) => {
            const isactive = pathname === link.route;

            return (
              <li key={link.label}>
                <NavLink
                  to={link.route}
                  className={({ isActive }) =>
                    `flex flex-col justify-center  items-center  rounded-md ${
                      isActive ? "bg-purple-500" : ""
                    }`
                  }
                  style={{
                    padding: "4px 8px",
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
                    fontSize="0.5rem"
                  >
                    {link.label}
                  </Text>
                </NavLink>
              </li>
            );
          })}
        </div>
      </ul>
    </Box>
  );
};

export default Bottombar;
