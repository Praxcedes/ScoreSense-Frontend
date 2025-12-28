import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = login({ email, password });

    //  ROLE-BASED REDIRECT
    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-green-400">
          ScoreSense
        </h1>
        <p className="text-sm text-gray-400">
          Sign in to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-400">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-lg bg-black/40 border border-green-900/40 focus:border-green-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2 rounded-lg bg-black/40 border border-green-900/40 focus:border-green-500 outline-none"
          />
        </div>

        <button className="w-full mt-4 py-2 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400">
          Sign In
        </button>
      </form>

      <p className="text-sm text-center text-gray-400 mt-6">
        Don’t have an account?{" "}
        <Link to="/register" className="text-green-400 hover:underline">
          Create Analyst Account
        </Link>
      </p>
    </div>
  );
}
