import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import UserManagement from "../pages/UserManagement";
import ListingManagement from "../pages/ListingManagement";
import MessagingOversight from "../pages/MessagingOversight";
import Login from "../pages/Login";
import { useAuth } from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import { navItems } from "../utils/constants";

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public login route */}
        <Route
          path={`/login`}
          element={
            !isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />
          }
        />

        {/* Protected routes */}
        <Route
          path={`${navItems[0].href}`}
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path={`${navItems[1].href}`}
          element={
            <PrivateRoute>
              <UserManagement />
            </PrivateRoute>
          }
        />
        <Route
          path={`${navItems[2].href}`}
          element={
            <PrivateRoute>
              <ListingManagement />
            </PrivateRoute>
          }
        />
        <Route
          path={`${navItems[3].href}`}
          element={
            <PrivateRoute>
              <MessagingOversight />
            </PrivateRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route
          path={"*"}
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
