import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Loader } from "../components";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {!isAuthenticated && (
        <>
          <section className="w-1/2 flex justify-center flex-1 flex-col items-center">
            <Outlet />
          </section>
          <Box
            width={"50%"}
            display={{
              base: "none",
              md: "block",
            }}
            height={"100%"}
          >
            <img
              // src="/public/images/side-img.svg"
              src="/images/side-img.svg"
              alt="logo"
              className=" w-full  max-h-screen  object-cover bg-no-repeat"
            />
          </Box>
        </>
      )}
    </>
  );
};

export default AuthLayout;
