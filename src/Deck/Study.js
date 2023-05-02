import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import Cards from "../Card/Cards"


function Study() {
    const [deck, setDeck] = useState();
    const { deckId } = useParams();

    useEffect(() => {
         readDeck(deckId).then((data) => {
            setDeck(data);
            
        })
      }, [deckId]);
 
      return (
        <div>
            <div>
                <nav aria-label="Breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>{deck && deck.name}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                        Study
                        </li>
                    </ol>
                </nav>
            </div>
            <h2>{deck && deck.name}: Study</h2>
            <div><Cards /></div>
        </div>
    )

}

export default Study;