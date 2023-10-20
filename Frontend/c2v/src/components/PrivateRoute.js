import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ element }) => {
  const { currentUser } = useAuth();

  return currentUser ? element : <Navigate to="/Login" />;
};

export default PrivateRoute;
