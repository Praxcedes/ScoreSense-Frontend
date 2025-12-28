import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-green-400">
          Create Analyst Account
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Join ScoreSense and start predicting
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4">
        <div>
          <label className="text-sm text-gray-400">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full mt-1 px-4 py-2 rounded-lg bg-black/40 border border-green-900/40 focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full mt-1 px-4 py-2 rounded-lg bg-black/40 border border-green-900/40 focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full mt-1 px-4 py-2 rounded-lg bg-black/40 border border-green-900/40 focus:outline-none focus:border-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 py-2 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400 transition"
        >
          Create Account
        </button>
      </form>

      {/* Footer */}
      <p className="text-sm text-center text-gray-400 mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-green-400 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
