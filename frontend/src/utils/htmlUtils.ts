import type { Game } from "../models/Game";
import { deleteGame, getGames, updateGame } from "../services/gameService";

export const createHtml = (toPlay: Game[]) => {
  const gameContainer = document.getElementById("gameContainer");

  if (gameContainer) {
    gameContainer.innerHTML = "";
  }

  toPlay.forEach((game) => {
    const gameCard = document.createElement("li");
    const gameTitle = document.createElement("span");
    const toggleButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    gameTitle.innerHTML = game.title;
    toggleButton.innerHTML = "✅";
    deleteButton.innerHTML = "❌";
    toggleButton.className = "myButtons";
    deleteButton.className = "myButtons";

    if (game.played) {
      gameTitle.className = "played";
    }

    toggleButton.addEventListener("click", async () => {
      const success = await updateGame(game.id, {
        ...game,
        played: !game.played,
      });

      if (success) {
        const gamesToPlay = await getGames();
        createHtml(gamesToPlay);
      } else {
        console.error("Something went terribly wrong...");
      }
    });

    deleteButton.addEventListener("click", async () => {
      const success = await deleteGame(game.id);

      if (success) {
        const gameToPlay = await getGames();

        createHtml(gameToPlay);
      } else {
        console.error("Something went terribly wrong");
      }
    });

    gameCard.appendChild(gameTitle);
    gameCard.appendChild(toggleButton);
    gameCard.appendChild(deleteButton);
    gameContainer?.appendChild(gameCard);
  });
};
