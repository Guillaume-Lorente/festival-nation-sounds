import { Navigate } from "react-router-dom";

export default function PrivateAdminRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token || token === "undefined") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}