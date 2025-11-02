import React, { createContext, useState, useEffect, useContext } from "react";
import { serverUrl } from "../main";
import axios from "axios";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCurrentUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while fetching current user."
      );
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const value = {
    userData,
    loading,
    error,
    fetchCurrentUser,
  };
  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export const useUser = () => useContext(userDataContext);

export default UserContext;
