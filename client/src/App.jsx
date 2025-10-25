import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import UserContext, { userDataContext } from "./contexts/userContext";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";

const App = () => {
  const { userData } = useContext(userDataContext);

  return (
    <UserContext>
      <Routes>
        <Route path="/signup" element={!userData ? <Signup /> : <Home />} />
        <Route path="/login" element={userData ? <Home /> : <Login />} />
        <Route path="/" element={userData ? <Home /> : <Signup />} />
      </Routes>
    </UserContext>
  );
};

export default App;
