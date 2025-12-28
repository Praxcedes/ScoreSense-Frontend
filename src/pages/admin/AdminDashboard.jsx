import AdminStats from "../../components/features/admin/dashboard/AdminStats";
import RecentPredictions from "../../components/features/admin/dashboard/RecentPredictions";

export default function AdminDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-400">
          Platform performance overview & analytics
        </p>
      </div>

      {/* Stats */}
      <AdminStats />

      {/* Recent Activity */}
      <RecentPredictions />
    </div>
  );
}
