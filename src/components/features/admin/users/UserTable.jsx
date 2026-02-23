const users = [
  {
    id: "USR-8921",
    name: "Kevin Mwangi",
    email: "kevin.m@example.com",
    points: 2450,
    region: "Nairobi, KE",
    activity: "2 mins ago",
    status: "Active",
  },
  {
    id: "USR-8922",
    name: "John Doe",
    email: "johndoe88@gmail.com",
    points: 850,
    region: "Mombasa, KE",
    activity: "4 hrs ago",
    status: "Pending",
  },
  {
    id: "USR-8923",
    name: "Sarah Ochieng",
    email: "sarah.o@example.com",
    points: 12100,
    region: "Kisumu, KE",
    activity: "1 day ago",
    status: "Active",
  },
  {
    id: "USR-8924",
    name: "David Kamau",
    email: "david.k99@yahoo.com",
    points: 0,
    region: "Nakuru, KE",
    activity: "2 weeks ago",
    status: "Suspended",
  },
];

const statusStyles = {
  Active: "text-green-400 bg-green-400/10",
  Pending: "text-yellow-400 bg-yellow-400/10",
  Suspended: "text-red-400 bg-red-400/10",
};

export default function UserTable() {
  return (
    <div className="mt-6 bg-green-900/20 border border-green-900/40 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-green-900/30 text-gray-400">
          <tr>
            <th className="px-4 py-3 text-left">USER ID</th>
            <th className="px-4 py-3 text-left">USER DETAILS</th>
            <th className="px-4 py-3">POINTS</th>
            <th className="px-4 py-3">REGION</th>
            <th className="px-4 py-3">LAST ACTIVITY</th>
            <th className="px-4 py-3">STATUS</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t border-green-900/30 hover:bg-green-900/10"
            >
              <td className="px-4 py-4 text-green-400">#{user.id}</td>

              <td className="px-4 py-4">
                <p className="font-medium text-white">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </td>

              <td className="px-4 py-4 text-center">
                {user.points.toLocaleString()}
              </td>

              <td className="px-4 py-4 text-center">{user.region}</td>

              <td className="px-4 py-4 text-center text-gray-400">
                {user.activity}
              </td>

              <td className="px-4 py-4 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[user.status]}`}
                >
                  {user.status}
                </span>
              </td>

              <td className="px-4 py-4 text-center text-gray-400 cursor-pointer">
                ⋮
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
