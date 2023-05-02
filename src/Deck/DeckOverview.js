import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../Layout/style.css"



function DeckOverview(
{   
    deck, setDeck, readDeck, handleDeckDelete, handleCardDelete
}
) {
    const { deckId } = useParams();

    const cardList = deck.cards;
  
    useEffect(() => {
      readDeck(deckId).then((data) => setDeck(data));
    }, [deckId, readDeck, setDeck]);

    function deleteDeck() {
        handleDeckDelete(deck.id);
      }

    function cardDelete(event){
        const cardId = event.target.closest('tbody').getAttribute('data-card-id');
        handleCardDelete(cardId, deck.id);
    }
  
    const eachCard = cardList.map(function(card) {
        return (
                    <tbody data-card-id={card.id}>
                        <tr className="border">
                            <td className="p-3">
                                {card.front}
                            </td>
                            <td className="p-3">
                                {card.back}
                                <div className="editDeleteButtons text-right">
                                    <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}  className="btn btn-secondary mr-2 mt-2">Edit</Link>
                                    <Link to="#" className="btn btn-danger mr-2 mt-2" onClick={cardDelete}>Delete</Link>
                                </div>
                            </td>
                        </tr>
                    </tbody>
        )
      });


return (
    <div>
        <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    {deck.name}
                </li>
            </ol>
        </nav>
    <div>
            <h4>{deck.name}</h4>
            <p>{deck.description}</p>
            <div>
                <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary mr-2">Edit</Link>
                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">Study</Link>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary mr-2">Add Cards</Link>
                <Link to="#" className="btn btn-danger" onClick={deleteDeck} >Delete</Link>
            </div>
            <div className="mt-4">
            <h3>Cards</h3>
                <table>
                {eachCard}
                </table>
            </div>
        </div>
    </div>
);


}


export default DeckOverview;