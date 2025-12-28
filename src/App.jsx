import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Layouts */
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";

/* Route Guards */
import AdminRoute from "./routes/AdminRoute";
import PublicRoute from "./routes/PublicRoute";

/* Auth Pages */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* Admin Pages */
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Tournaments from "./pages/admin/Tournaments";
import Events from "./pages/admin/Events";
import Points from "./pages/admin/Points";
import Config from "./pages/admin/Config";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= AUTH ROUTES ================= */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="tournaments" element={<Tournaments />} />
          <Route path="events" element={<Events />} />
          <Route path="points" element={<Points />} />
          <Route path="config" element={<Config />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
