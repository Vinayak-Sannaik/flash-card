import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function deleteCardOnDeckController(req: Request, res: Response) {

  // const confirmation = window.confirm("Are you sure you want to delete this card?");
  //   if (!confirmation) {
  //     return; // If the user cancels, do nothing
  //   }

  // 1. Get the deck ID from URL
  const deckId = req.params.deckId;
  const index = req.params.index;
  console.log(deckId, index);

  const deck = await Deck.findById(deckId);

  // 3. Return the deleted deck to the user who made the request
  if (!deck) return res.status(404).send("Deck not found");

  deck.cards.splice(parseInt(index), 1);
  await deck.save();
  res.json(deck);
}
