import React, { createContext } from "react";
import { serverUrl } from "../main";
export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const value = {
    serverUrl,
  };
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
};

export default UserContext;
