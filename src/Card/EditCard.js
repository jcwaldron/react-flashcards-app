import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import CardForm from "./CardForm";
import { updateCard, readCard, readDeck } from "../utils/api";
import "../Layout/style.css"

function EditCard({
    cards, setCards, 
    handleCardInput, 
    cardFormData, setCardFormData, 
    deck, setDeck
}) {

    const history = useHistory();
    const { cardId, deckId } = useParams();
    const [card, setCard] = useState({});

    useEffect(() => {
        readCard(cardId).then((data) => setCard(data));
      }, [cardId]);    useEffect(() => {
        readCard(cardId).then((data) => {
            setCard(data);
            setCardFormData({
                front: data.front,
                back: data.back
            });
        });
    }, [cardId, setCardFormData]);
      
      async function updateHandler(event) {
        event.preventDefault();
        try {
          const updated = await updateCard({ ...card, ...cardFormData });
          const updatedCards = cards.map((c) => (c.id === updated.id ? updated : c));
          setCards(updatedCards);
          setCard(updated);
          const updatedDeck = await readDeck(deckId);
          setDeck(updatedDeck);
          history.goBack();
        } catch (error) {
          // handle error
          console.error(error);
        }
      }
          


        const cardIndex = cards.findIndex((c) => c.id === card.id);

    return (

        <div>
            <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/" >Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deck?.id}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Edit Card {cardIndex + 1}
                </li>
                </ol>
                <div>
                    <form onSubmit={updateHandler}>
                        <CardForm
                            handleCardInput={handleCardInput}
                            cardFormData={cardFormData}
                            isNewCard={false}
                            card={card}
                            setCard={setCard}
                         />
                    </form>
                </div>
            </nav>
        </div>

    )
}

export default EditCard;