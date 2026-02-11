import express, { json } from "express";
import cors from "cors";
import { toPlayRouter } from "./routes/toPlayRouter.mjs";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(json());

app.use("/toplay", toPlayRouter);

app.listen(3000, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Api is up and running on port: 3000");
  }
});
