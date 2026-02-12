import { Game } from "../models/Game.mjs";
import QueryString from "qs";
import { GameModel } from "../models/GameSchema.mjs";

// export const gameList: Game[] = [
//   new Game(1, "Kingdom Come Deliverance II"),
//   new Game(2, "Red Dead Redemption 2"),
//   new Game(3, "Grand Theft Auto V"),
// ];

export const getGames = async (
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
  const gameList = await GameModel.find();
  let filteredList = [...gameList];

  if (search) {
    filteredList = filteredList.filter((game) =>
      game.title?.toLocaleLowerCase().startsWith(search as string),
    );
  }

  if (sort) {
    if ((sort as string) === "asc") {
      filteredList.sort((a, b) => {
        if (
          a.title &&
          b.title &&
          a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()
        )
          return -1;
        if (
          a.title &&
          b.title &&
          a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()
        )
          return 1;
        return 0;
      });
    }
  }

  return filteredList;
};

export const getGame = async (id: string) =>
  await GameModel.findOne({ id: +id });

export const createGame = async (game: string) => {
  const newGame = new Game(Date.now(), game);

  const createdGame = await GameModel.create(newGame);

  return createdGame;
};

export const deleteGame = async (id: string) => {
  const deletedGame = await GameModel.findOneAndDelete({ id: +id });

  if (deletedGame) {
    return true;
  }
  return false;
};

export const patchGame = async (game: Game) => {
  await GameModel.findOneAndUpdate({ id: game.id }, game);

  return game;
};
