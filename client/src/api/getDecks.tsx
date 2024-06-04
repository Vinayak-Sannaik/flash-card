import { API_URL } from "./config";

export type TDeck = {
    title : string;
    _id : string;
    cards : string[];
  };
export default async function getDecks() :Promise<TDeck[]> {
    const response = await fetch(`${API_URL}/decks`);
    return response.json();
}