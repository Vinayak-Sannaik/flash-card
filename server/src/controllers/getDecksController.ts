import { Request, Response } from "express"
import Deck from '../models/Deck'

export async function getDecksController(req: Request, res: Response){
    
        // Find all the data from mongo
        const decks = await Deck.find()
        // Send Json response to frontend/client
        res.json(decks)
      
}

