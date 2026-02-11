import type { Game } from "../models/Game";

export const getGames = async () => {
  try {
    const response = await fetch("http://localhost:3000/toplay/");
    const data: Game[] = await response.json();
    return data;
  } catch (error) {
    console.error(error, "Could not fetch data from api");
    return [];
  }
};

export const getGamesById = async (id: number) => {
  const response = await fetch("http://localhost:3000/toplay/" + id);
  const data = await response.json();
  return data;
};

export const addGame = async (text: string) => {
  const response = await fetch("http://localhost:3000/toplay", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ gameTitle: text }),
  });

  const data: Game = await response.json();
  return data;
};

export const deleteGame = async (id: number) => {
  try {
    const response = await fetch("http://localhost:3000/toplay/" + id, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateGame = async (id: number, game: Game) => {
  try {
    const response = await fetch("http://localhost:3000/toplay/" + id, {
      method: "PATCH",
      body: JSON.stringify({ game }),
      headers: {
        "content-type": "application/json",
      },
    });
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};
