import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050b08] text-white">
      <div className="w-full max-w-md bg-green-900/20 border border-green-900/40 rounded-2xl p-8">
        <Outlet />
      </div>
    </div>
  );
}
