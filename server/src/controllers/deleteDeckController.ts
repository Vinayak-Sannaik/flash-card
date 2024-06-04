import { Request, Response } from "express";
import Deck from '../models/Deck'

export async function deleteDeckController(req: Request, res: Response){
        try {
          // 1. Get the deck ID from URL
          const deckId = req.params.deckId;
          // console.log(deckId);
      
          // 2. Delete the deck from MongoDB
          const deck = await Deck.findByIdAndDelete(deckId);
      
          // 3. Return the deleted deck to the user who made the request
          if (deck) {
            res.json(deck);
          } else {
            res.status(404).json({ message: "Deck not found" });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Server error" });
        }
      }
