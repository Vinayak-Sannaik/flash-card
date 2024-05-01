import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
config();
const app = express();
const PORT = process.env.PORT || 5000;

import Deck from "./models/Deck";

app.use(express.json());

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: "testing card",
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose.connect(process.env.MONGO_URI!).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
