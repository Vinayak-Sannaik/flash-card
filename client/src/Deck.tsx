import React, {useEffect, useState } from "react";
import "./App.css";
import { useParams } from "react-router-dom";
// import getDecks from "./api/getDecks";
// import { TDeck } from "./api/getDecks";
// import createDeck from "./api/createDeck";
// import deleteDecks from "./api/deleteDecks";
import createCard from "./api/createCard";
import getDeck from "./api/getDeck";
import { TDeck } from "./api/getDecks";
import deleteCard from "./api/deleteCard";

export default function Deck() {
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [deck, setDeck] = useState<TDeck | undefined>();
  const {deckId} = useParams()

  useEffect(() => {
    
    async function fetchDeck() {
      if(!deckId) return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards)
    }
    fetchDeck();
  }, [deckId]);

  // Delete method
  async function handleDeleteCard(index: number) {
    if(!deckId) return;
    // console.log(deckId)
    const newDeck = await deleteCard(deckId , index);
    console.log(newDeck)
    setCards(newDeck.cards)
    
  }

  //Post method - send data to backend
  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    const {cards: serverCards} = await createCard(deckId! ,text);
    setCards(serverCards)
    setText("");
  };

  // console.log(cards)

 
  return (
    <div className="App">
      <h2 className="deck-title">{deck?.title}</h2>
      <ul className="decks">
        {cards.map((card,index) => (
          <li key={index}>
            <button onClick={() => handleDeleteCard(index)}>X</button>
            {card}
          </li>
        ))}
      </ul>

      <form onSubmit={handleCreateCard}>
        {/* <label htmlFor="deck_input">Title</label> */}
        <input
          id="deck_input"
          type="text"
          value={text}
          placeholder="Card Text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
        />
        <button>Create</button>
      </form>
    </div>
  );
}