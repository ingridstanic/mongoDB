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
toPlayRouter.get("/", async (req, res) => {
  try {
    const { search, sort } = req.query;
    const games = await getGames(search, sort);

    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal error", error });
  }
});

//read - GET /toplay/1
toPlayRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const game = await getGame(id);

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
toPlayRouter.post("/", async (req, res) => {
  try {
    const { gameTitle } = req.body;

    if (gameTitle && gameTitle !== "") {
      const newGame = await createGame(gameTitle);

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
toPlayRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const success = await deleteGame(id);

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
toPlayRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { game }: { game: Game } = req.body;

    if (+id !== game.id) {
      res.status(400).json({ message: "Parameter and body does not match" });
    } else {
      const found = await patchGame(game);

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
