import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export default async function deleteCard(deckId : string, index: number): Promise<TDeck[]>{

  // Prompt the user for confirmation
  const confirmation = window.confirm("Are you sure you want to delete this card?");
  if (!confirmation) {
    return; // If the user cancels, do nothing
  }
  
    const response = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
        method: "DELETE",
      });

      return response.json()
}