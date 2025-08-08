// utils/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "..//context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  //   if (loading) return(<CustomLoader/>);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
