let userPoints = 250;

export const getUserPoints = async () => {
  return userPoints;
};

export const addPoints = async (amount) => {
  userPoints += amount;
  return userPoints;
};

export const deductPoints = async (amount) => {
  userPoints -= amount;
  return userPoints;
};
