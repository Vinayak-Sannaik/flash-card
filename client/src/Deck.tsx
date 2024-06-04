import React, {useState } from "react";
import "./App.css";
import { useParams } from "react-router-dom";
// import getDecks from "./api/getDecks";
// import { TDeck } from "./api/getDecks";
// import createDeck from "./api/createDeck";
// import deleteDecks from "./api/deleteDecks";
import createCard from "./api/createCard";

export default function Deck() {
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState("");
  const {deckId} = useParams()

  //Post method - send data to backend
  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    const {cards: serverCards} = await createCard(deckId! ,text);
    setCards(serverCards)
    setText("");
  };

  console.log(cards)
 
  return (
    <div className="App">
      <ul className="decks">
        {cards.map((card) => (
          <li key={card}>
            {/* <button onClick={() => handleDeleteDeck(deck._id)}>X</button> */}
            {/* <Link to={`decks/${deck._id}`}>{deck.title}</Link> 
            */}
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
        <button>Create Card</button>
      </form>
    </div>
  );
}