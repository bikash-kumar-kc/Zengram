import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { createContext } from "react";
import authenservice from "../lib/appwrite/auth_api";

export const INITIAL_USER = {
  id: "",
  name: "",
  userName: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => {},
};

const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentUser = await authenservice.getCurrentUser();

      if (currentUser) {
        setUser({
          id: currentUser.$id,
          name: currentUser.name,
          userName: currentUser.username,
          email: currentUser.email,
          imageUrl: currentUser.imageUrl,
          bio: currentUser.bio,
        });

        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cookiefallback = localStorage.getItem("CookieFallback");

    if (
      cookiefallback === "[]" ||
      cookiefallback === null ||
      cookiefallback === undefined
    ) {
      navigate("/signin");
    }

    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
