/* MOCK TOURNAMENT DATA */

export const getTournaments = async () => {
  return [
    {
      id: 1,
      name: "Champions Coin Clash",
      entryFee: 50,
      prizePool: 500,
      status: "Open",
      players: 8,
    },
    {
      id: 2,
      name: "UFC Fight Night Pool",
      entryFee: 30,
      prizePool: 300,
      status: "Ongoing",
      players: 12,
    },
  ];
};

export const createTournament = async (data) => {
  console.log("Creating tournament:", data);
  return { success: true };
};
