import StatsGrid from "../../components/features/dashboard/StatsGrid";

const Home = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-green-400">
        Overview
      </h2>

      <StatsGrid />
    </div>
  );
};

export default Home;
