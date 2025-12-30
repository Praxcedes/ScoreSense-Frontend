import { createContext, useContext, useEffect, useState } from "react";
import { getUserPoints, addPoints, deductPoints } from "../api/points";

const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    getUserPoints().then(setPoints);
  }, []);

  const earnPoints = async (amount) => {
    const newPoints = await addPoints(amount);
    setPoints(newPoints);
  };

  const spendPoints = async (amount) => {
    const newPoints = await deductPoints(amount);
    setPoints(newPoints);
  };

  return (
    <PointsContext.Provider value={{ points, earnPoints, spendPoints }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => useContext(PointsContext);
