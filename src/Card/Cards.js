import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

function Cards() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [shouldShowFront, setShouldShowFront] = useState(true);


  const flipHandler = () => {
    setShouldShowFront(!shouldShowFront);
  };

  const nextHandler = () => {
    if (currentCardIndex +1 < deck.cards.length) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShouldShowFront(true);
    } else {
      if (window.confirm("Restart cards? Click 'cancel' to return to the home page.")) {
        setCurrentCardIndex(0);
        setShouldShowFront(true);
      } else {
        history.push('/');
      }
    }
  };


  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted", deckId);
        } else {
          throw error;
        }
      }
    }
    fetchDeck();

    return () => {
      abortController.abort();
    };
  }, [deckId]);

  if (deck.cards && deck.cards.length > 0 && deck.cards.length > 2) {
    const currentCard = deck.cards[currentCardIndex];
    
    return (
      <div>
        <div className="border p-3 mt-3">
          <h4>Card {(currentCardIndex + 1)} of {deck.cards.length}</h4>
          {shouldShowFront ? currentCard.front : currentCard.back}
          <div>
          <button className="btn btn-secondary mt-2" onClick={flipHandler}>
            Flip
          </button>
        {!shouldShowFront && <button className="btn btn-primary mt-2 ml-2" onClick={nextHandler}>
            Next
          </button>}
        </div>
        </div>

      </div>
    );
  } else {
    return (
    <div>
      <h3>Not enough cards.</h3>
      <p>
        You need at least 3 cards to study. There are {deck.cards ? deck.cards.length : 0} cards in this deck.
      </p>
    </div>
    )
  } 


}



export default Cards;
