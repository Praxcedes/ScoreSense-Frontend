import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔴 TEMP FAKE LOGIN (replace with API later)
    if (email === "admin@scoresense.com" && password === "admin123") {
      login({
        id: 1,
        name: "Admin",
        email,
        role: "admin",
      });

      navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0f172a] p-8 rounded-xl w-[380px] border border-green-500"
      >
        <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
          ScoreSense Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-black border border-gray-700 rounded text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-black border border-gray-700 rounded text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
