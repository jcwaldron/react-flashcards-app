import React from "react";
import { Link } from "react-router-dom";
import Deck from "./Deck";

function Decks({decks, setDecks, handleDeckDelete}){ 
  
    const listOfDecks = decks.map((deck) => (
      <Deck 
      key={deck.id} 
      deck={deck} 
      handleDeckDelete={handleDeckDelete}
      setDecks={setDecks} />
    ));
  
    return (
      <div>
        <Link to="/decks/new" className="btn btn-secondary ">Create Deck</Link>
        {listOfDecks}
      </div>
    );
  };

export default Decks;
