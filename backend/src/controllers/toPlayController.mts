import { Game } from "../models/Game.mjs";
import QueryString from "qs";

export const gameList: Game[] = [
  new Game(1, "Kingdom Come Deliverance II"),
  new Game(2, "Red Dead Redemption 2"),
  new Game(3, "Grand Theft Auto V"),
];

export const getGames = (
  search:
    | string
    | QueryString.ParsedQs
    | (string | QueryString.ParsedQs)[]
    | undefined,
  sort:
    | string
    | QueryString.ParsedQs
    | (string | QueryString.ParsedQs)[]
    | undefined,
) => {
  let filteredList = [...gameList];

  if (search) {
    filteredList = filteredList.filter((game) =>
      game.title.toLocaleLowerCase().startsWith(search as string),
    );
  }

  if (sort) {
    if ((sort as string) === "asc") {
      filteredList.sort((a, b) => {
        if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase())
          return -1;
        if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) return 1;
        return 0;
      });
    }
  }

  return filteredList;
};

export const getGame = (id: string) => {
  return gameList.find((game) => game.id === +id);
};

export const createGame = (game: string) => {
  const newGame = new Game(Date.now(), game);

  gameList.push(newGame);

  return newGame;
};

export const deleteGame = (id: string) => {
  const index = gameList.findIndex((game) => game.id === +id);

  if (index >= 0) {
    gameList.splice(index, 1);
    return true;
  }
  return false;
};

export const patchGame = (game: Game) => {
  const found = gameList.find((g) => g.id === game.id);

  if (found) {
    found.played = game.played;
    found.title = game.title;
  }

  return found;
};
