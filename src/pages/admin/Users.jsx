import UserStats from "../../components/features/admin/users/UserStats";
import UserTable from "../../components/features/admin/users/UserTable";

export default function Users() {
  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            User Management
          </h1>
          <p className="text-sm text-gray-400">
            Manage platform users, balances, and activity.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm rounded-lg border border-green-700 text-green-400 hover:bg-green-700/10">
            Audit Logs
          </button>

          <button className="px-4 py-2 text-sm rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400">
            + Create User
          </button>
        </div>
      </div>

      <UserStats />
      <UserTable />
    </div>
  );
}
