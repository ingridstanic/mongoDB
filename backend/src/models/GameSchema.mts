import { model, Schema } from "mongoose";

const gameSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, requried: true, minLength: 3 },
  played: Boolean,
});

export const GameModel = model("Game", gameSchema);
