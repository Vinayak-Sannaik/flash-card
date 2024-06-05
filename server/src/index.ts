import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors"
config();
const app = express();
const PORT = process.env.PORT || 5000;

import Deck from "./models/Deck";
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/creteDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController";

// allow all 
app.use(cors({
  origin : "*"
}))

// built in middleware
app.use(express.json());

app.get("/decks", getDecksController)
app.post("/decks",createDeckController);
app.delete("/decks/:deckId", deleteDeckController);
app.get("/decks/:deckId", getDeckController);
app.post("/decks/:deckId/cards", createCardForDeckController);
app.delete("/decks/:deckId/cards/:index", deleteCardOnDeckController);


mongoose.connect(process.env.MONGO_URI!).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
