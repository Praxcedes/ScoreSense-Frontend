import StatsGrid from "../../components/features/dashboard/StatsGrid";
import LiveMatches from "../../components/features/dashboard/LiveMatches";
import ActivePredictions from "../../components/features/dashboard/ActivePredictions";
import ActivityFeed from "../../components/features/dashboard/ActivityFeed";
import QuickPredict from "../../components/features/dashboard/QuickPredict";

const Home = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, <span className="text-primary">Juma</span>
          </h1>
          <p className="text-muted">
            Your analytics overview for today.
          </p>
        </div>

        <div className="bg-surface px-4 py-2 rounded-full flex items-center gap-2">
          <span className="text-primary font-semibold">12,500 VP</span>
          <button className="bg-primary text-black rounded-full w-6 h-6">+</button>
        </div>
      </div>

      {/* Stats */}
      <StatsGrid />

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <LiveMatches />
          <ActivePredictions />
        </div>

        <div className="space-y-6">
          <QuickPredict />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default Home;
