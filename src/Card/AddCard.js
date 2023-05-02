import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";

function AddCard({ 
    handleCardInput, 
    cardFormData, 
    addCardFormHandler, 
    initialCardFormData,
    addCardDoneHandler,
    card, setCard}){

    const [deck, setDeck] = useState({cards: []});
    const { deckId } = useParams();

    useEffect(() => {
        readDeck(deckId).then((data) => setDeck(data));
      }, [deckId]);

    return(
        <div>
            <nav aria-label="Breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/" >Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="/decks/:deckId/view" >{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Add Card
                    </li>
                </ol>
            </nav>
            <div>
                <h2>{deck.name}: Add Card</h2>
            </div>
            <form onSubmit={addCardFormHandler}>
                <CardForm 
                handleCardInput={handleCardInput}
                cardFormData={cardFormData}
                addCardDoneHandler={addCardDoneHandler}
                initialCardFormData={initialCardFormData}
                isNewCard={true}
                card={card}
                setCard={setCard}/>
            </form>
        </div>

    )
}

export default AddCard;