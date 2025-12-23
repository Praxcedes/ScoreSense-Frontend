import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-8 rounded-lg w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
