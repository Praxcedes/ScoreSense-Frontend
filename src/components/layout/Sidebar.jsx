import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/tournaments", label: "Tournaments" },
    { to: "/admin/events", label: "Events" },
    { to: "/admin/points", label: "Points" },
    { to: "/admin/config", label: "Config" },
  ];

  return (
    <aside className="w-64 bg-zinc-950 border-r border-green-500/20 p-4">
      <h2 className="text-green-400 font-bold mb-6">ScoreSense Admin</h2>

      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive
                  ? "bg-green-500 text-black"
                  : "text-gray-400 hover:bg-zinc-800"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
