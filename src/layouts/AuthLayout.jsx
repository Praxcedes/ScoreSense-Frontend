import { Outlet } from "react-router-dom";
import appLogo from "../assets/ScoreSense Logo.png";

export default function AuthLayout() {
  return (

    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-8 rounded-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 overflow-hidden flex items-center justify-center">
            <img src={appLogo} alt="ScoreSense logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="mt-3 text-xl font-bold text-white">ScoreSense</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
