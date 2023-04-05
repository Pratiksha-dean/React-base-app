import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import ChangePassword from "../pages/change-password";
import Dashboard from "../pages/Dashboard";
import EditProfile from "../pages/edit-profile";
import ForgotPassword from "../pages/forgot-password";
import Login from "../pages/login";
import SignUp from "../pages/sign-up";
import { getToken } from "./Constant";

const RoutePage = () => {
  const PrivateRoute = ({ children }) => {
    let token = getToken();
    if (!token || token == null) {
      return <Navigate to="/login" />;
    } else if (token) {
      return <>{children}</>;
    }
  };

  const PublicRoute = ({ children }) => {
    let token = getToken();
    if (token !== "" && token !== null) {
      return <Navigate to="/dashboard" />;
    }
    return <>{children}</>;
  };

  return (
    <Routes>
      {/* <Route path="/notfound" element={<NotFound />} /> */}
      <Route
        path="/*"
        exact
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        exact
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/*"
        exact
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/change-password"
        element={
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        }
      />

      <Route
        path="/edit-profile"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default RoutePage;
