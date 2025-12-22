import { Home, BarChart2, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-black border-r border-green-800 p-4">
      <h1 className="text-2xl font-bold text-green-400 mb-8">
        ScoreSense
      </h1>

      <nav className="space-y-4">
        <Link to="/" className="flex gap-2 hover:text-green-400">
          <Home size={18} /> Dashboard
        </Link>

        <Link to="/predict" className="flex gap-2 hover:text-green-400">
          <BarChart2 size={18} /> Predict
        </Link>

        <Link to="/admin" className="flex gap-2 hover:text-green-400">
          <Users size={18} /> Admin
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
