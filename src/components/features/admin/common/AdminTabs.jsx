import { NavLink } from "react-router-dom";

const tabs = [
  { name: "Overview", path: "/admin" },
  { name: "Users", path: "/admin/users" },
  { name: "Tournaments", path: "/admin/tournaments" },
  { name: "Sports Events", path: "/admin/events" },
  { name: "Points", path: "/admin/points" },
  { name: "Config", path: "/admin/config" },
];

export default function AdminTabs() {
  return (
    <nav className="flex gap-6 px-6 py-3 border-b border-green-900/30">
      {tabs.map((tab) => (
        <NavLink
          key={tab.name}
          to={tab.path}
          end
          className={({ isActive }) =>
            `text-sm font-medium ${
              isActive
                ? "text-green-400 border-b-2 border-green-400 pb-2"
                : "text-gray-400 hover:text-green-300"
            }`
          }
        >
          {tab.name}
        </NavLink>
      ))}
    </nav>
  );
}
