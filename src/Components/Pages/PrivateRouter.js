import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = (props) => {
  //   let auth = { token: false };
  console.log(props);
  return props.auth.token ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
