import { TrendingUp, Trophy, Coins } from "lucide-react";
import Card from "../../common/Card";

const stats = [
  {
    label: "Total Predictions",
    value: 124,
    icon: TrendingUp,
  },
  {
    label: "Win Rate",
    value: "67%",
    icon: Trophy,
  },
  {
    label: "Coins Earned",
    value: "3,450",
    icon: Coins,
  },
];

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map(({ label, value, icon: Icon }) => (
        <Card key={label}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{label}</p>
              <h3 className="text-2xl font-bold text-green-400">
                {value}
              </h3>
            </div>
            <Icon className="text-green-600" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
