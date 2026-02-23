import axios from "./axios";

/* ================= FOOTBALL EVENTS ================= */
export const getFootballEvents = async () => {
  // MOCK DATA (replace with real API later)
  return [
    {
      id: 1,
      league: "Premier League",
      home: "Arsenal",
      away: "Chelsea",
      time: "2025-02-10 18:00",
      odds: {
        home: 1.9,
        draw: 3.2,
        away: 2.8,
      },
    },
    {
      id: 2,
      league: "La Liga",
      home: "Barcelona",
      away: "Real Madrid",
      time: "2025-02-11 21:00",
      odds: {
        home: 2.1,
        draw: 3.5,
        away: 2.6,
      },
    },
  ];
};

/* ================= UFC EVENTS ================= */
export const getUFCEvents = async () => {
  return [
    {
      id: 101,
      fight: "Makhachev vs Volkanovski",
      category: "Lightweight Title",
      date: "2025-02-15",
      odds: {
        fighter1: 1.7,
        fighter2: 2.2,
      },
    },
  ];
};
