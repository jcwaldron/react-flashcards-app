import React from "react";
import { Link } from "react-router-dom";
import "../Layout/style.css"


function Deck({ deck, handleDeckDelete }) {

  function deleteDeck() {
    handleDeckDelete(deck.id);
  }

      return (
        <div className="deckItem border p-3 mt-3 ">
          <table className="deckNameCountTable">
            <tbody>
              <tr>
                 <td>
                   <h4>{deck.name} </h4>
                 </td>
                 <td className="deckCount text-secondary">
                  {deck.cards.length} cards
                 </td>
              </tr>
            </tbody>
          </table>
          <p>{deck.description}</p>
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary m-1">View</Link>
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary m-1">Study</Link>
          <Link to="#" className="btn btn-danger m-1" onClick={() => deleteDeck()}>Delete</Link>
        </div>
      );
    }
  

export default Deck;
