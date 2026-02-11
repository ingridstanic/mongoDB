import "./style.css";

import { addGame, getGames } from "./services/gameService";
import "./style.css";
import { createHtml } from "./utils/htmlUtils";

const games = await getGames();
createHtml(games);

document.getElementById("gameForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userInput = (document.getElementById("gameText") as HTMLInputElement)
    .value;

  await addGame(userInput);

  (document.getElementById("gameText") as HTMLInputElement).value = "";

  const newGames = await getGames();
  createHtml(newGames);
});
