  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import AdminLayout from "./layouts/AdminLayout";

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
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="tournaments" element={<Tournaments />} />
            <Route path="events" element={<Events />} />
            <Route path="points" element={<Points />} />
            <Route path="config" element={<Config />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Overview />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>
                      
        </Routes>
      </BrowserRouter>
    );
  }
