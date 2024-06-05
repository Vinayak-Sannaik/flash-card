import React, { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import getDecks from "./api/getDecks";
import { TDeck } from "./api/getDecks";
import createDeck from "./api/createDeck";
import deleteDecks from "./api/deleteDecks";
function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  //Post method - send data to backend
  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    await createDeck(title);
    setTitle("");
  };

  //Get method - get all existing decks from backend
  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks();
  }, [decks]);

  // Delete method
  async function handleDeleteDeck(deckId: string) {
    await deleteDecks(deckId);
    //Update the state to remove the deleted deck
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  return (
    <div className="container">
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
          </li>
        ))}
      </ul>

      <form onSubmit={handleCreateDeck}>
        {/* <label htmlFor="deck_input">Title</label> */}
        <input
          id="deck_input"
          type="text"
          value={title}
          placeholder="Create Deck"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create</button>
      </form>
    </div>
    </div>
  );
}

export default App;
