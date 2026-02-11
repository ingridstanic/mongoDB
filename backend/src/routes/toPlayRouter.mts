import express from "express";
import {
  createGame,
  deleteGame,
  getGame,
  getGames,
  patchGame,
} from "../controllers/toPlayController.mjs";
import type { Game } from "../models/Game.mjs";

export const toPlayRouter = express.Router();

//read - GET /toplay
toPlayRouter.get("/", (req, res) => {
  try {
    const { search, sort } = req.query;
    const games = getGames(search, sort);

    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal error", error });
  }
});

//read - GET /toplay/1
toPlayRouter.get("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const game = getGame(id);

    if (game) {
      res.status(200).json(game);
    } else {
      res.status(400).json({ message: "No game found with id: " + id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

//create - POST - /toplay
toPlayRouter.post("/", (req, res) => {
  try {
    const { gameTitle } = req.body;

    if (gameTitle && gameTitle !== "") {
      const newGame = createGame(gameTitle);

      res.status(201).json(newGame);
    } else {
      res.status(400).json({
        message: "Body does not contain required property or property is empty",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal error", error });
  }
});

//delete - /toplay/:id
toPlayRouter.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const success = deleteGame(id);

    if (success) {
      res.status(204).json();
    } else {
      res.status(400).json({ message: "Can not find game with id: " + id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal error", error });
  }
});

// update - PATCH/PUT /toplay/:id - body
toPlayRouter.patch("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { game }: { game: Game } = req.body;

    if (+id !== game.id) {
      res.status(400).json({ message: "Parameter and body does not match" });
    } else {
      const found = patchGame(game);

      if (found) {
        res.status(200).json(found);
      } else {
        res.status(404).json({ message: "Could not find game" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal error", error });
  }
});
