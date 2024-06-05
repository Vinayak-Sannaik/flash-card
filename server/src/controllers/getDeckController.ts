import { Request, Response } from "express"
import Deck from '../models/Deck'

export async function getDeckController(req: Request, res: Response){
    const {deckId} = req.params
        // Find all the data from mongo
        const deck = await Deck.findById(deckId)
        // Send Json response to frontend/client
        res.json(deck)
      
}

