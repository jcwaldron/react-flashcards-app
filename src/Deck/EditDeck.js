import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import DeckForm from "./DeckForm"
import { createDeck, readDeck, updateDeck } from "../utils/api";
import "../Layout/style.css"

function EditDeck({
    decks, setDecks, 
    submitHandler, handleInput, 
    formData, setFormData
}) {

    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState();

    useEffect(() => {
      readDeck(deckId).then((data) => setFormData(data));
    }, [deckId]);

    function updateHandler(event){
        event.preventDefault();
        updateDeck({...formData, id: deckId});
        history.goBack();
        readDeck(deckId).then((data) => setDeck(data));
      }
      
    
    return (

        <div>
            <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/" >Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to= "/decks/:deckId" >{deck?.name}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Edit Deck
                </li>
                </ol>
                <div>
                    <form onSubmit={updateHandler}>
                        <DeckForm
                            submitHandler={submitHandler}
                            handleInput={handleInput}
                            formData={formData}
                            setFormData={setFormData}
                            decks={decks}
                            setDecks={setDecks}
                            deck={deck}
                            setDeck={setDeck}
                            readDeck={readDeck}
                            createDeck={createDeck}
                            updateHandler={updateHandler}
                         />
                    </form>
                </div>
            </nav>
        </div>

    )
}

export default EditDeck;