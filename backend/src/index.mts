import express, { json } from "express";
import cors from "cors";
import { toPlayRouter } from "./routes/toPlayRouter.mjs";
import mongoose from "mongoose";
import { config } from "dotenv";

config();

const mongoURI = process.env.MONGO_URI || "";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(json());

app.use("/toplay", toPlayRouter);

app.listen(3000, async (error) => {
  try {
    if (error) {
      console.error(error);
    }

    await mongoose.connect(mongoURI);
    console.log(
      "API is up and running on port: 3000, connected to the database.",
    );
  } catch (error) {
    console.error(error);
  }
});
