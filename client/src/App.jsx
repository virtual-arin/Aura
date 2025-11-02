import React from "react";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { userDataContext } from "./contexts/userContext";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";

const App = () => {
  const { userData, loading } = useContext(userDataContext);

  if (loading) return <div>Loading...</div>;
  return (
    <Routes>
      <Route path="/signup" element={userData ? <Home /> : <Signup />} />
      <Route path="/login" element={userData ? <Home /> : <Login />} />
      <Route path="/" element={userData ? <Home /> : <Signup />} />
    </Routes>
  );
};

export default App;
