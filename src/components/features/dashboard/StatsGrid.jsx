import Card from "../../common/Card";

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>Total Predictions</Card>
      <Card>Win Rate</Card>
      <Card>Coins Earned</Card>
    </div>
  );
};

export default StatsGrid;
