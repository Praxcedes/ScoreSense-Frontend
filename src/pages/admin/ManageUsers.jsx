import Card from "../../components/common/Card";

const ManageUsers = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-green-400 text-xl">
        Admin Overview
      </h2>

      <div className="grid grid-cols-3 gap-6">
        <Card>Total Users: 342</Card>
        <Card>Total Predictions: 9,821</Card>
        <Card>Total Coins: 120,400</Card>
      </div>
    </div>
  );
};

export default ManageUsers;
