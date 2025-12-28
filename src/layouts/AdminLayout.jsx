import { Outlet } from "react-router-dom";
import AdminHeader from "../components/features/admin/common/AdminHeader";
import AdminTabs from "../components/features/admin/common/AdminTabs";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#08160f] to-black text-white">
      <AdminHeader />
      <AdminTabs />

      <main className="px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
