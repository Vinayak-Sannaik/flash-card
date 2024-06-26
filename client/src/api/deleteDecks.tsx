import { API_URL } from "./config";

export default async function deleteDecks(deckId : string){
  // Prompt the user for confirmation
  const confirmation = window.confirm("Are you sure you want to delete this card?");
  if (!confirmation) {
    return; // If the user cancels, do nothing
  }
    const response = await fetch(`${API_URL}/decks/${deckId}`, {
        method: "DELETE",
      });

      return response.json
}