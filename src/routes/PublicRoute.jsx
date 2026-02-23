import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    return user.role === "admin"
      ? <Navigate to="/admin" replace />
      : <Navigate to="/" replace />;
  }

  return children;
}
