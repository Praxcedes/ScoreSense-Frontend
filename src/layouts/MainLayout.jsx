import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-green-900 flex items-center px-6">
          <h1 className="text-green-400 font-semibold">
            Dashboard
          </h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
