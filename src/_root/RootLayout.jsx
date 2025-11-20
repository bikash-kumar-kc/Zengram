import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { Box } from "@chakra-ui/react";
import Bottombar from "../components/Bottombar";

const RootLayout = () => {
  return (
    <Box
      as="div"
      width="100%"
      display={{
        md: "flex",
      }}
    >
      <Topbar />
      <Sidebar />

      <Box
        as="section"
        width={{
          base: "100%",
          md: "75%",
          lg: "50%",
        }}
        mt="4rem"
        ml={{
          lg: "25%",
        }}
        className="flex flex-1 h-full"
      >
        <Outlet />
      </Box>

      <Bottombar />
    </Box>
  );
};

export default RootLayout;
