import React from "react";
import { Link } from "react-router-dom";
import DeckForm from "./DeckForm";





function CreateDeck({ submitHandler, handleInput, formData }){

    return(
        <div>
            <nav aria-label="Breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/" >Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Create Deck
                    </li>
                </ol>
            </nav>
            <div>
                <h2>Create Deck</h2>
            </div>
            <form onSubmit={submitHandler}>
                <DeckForm  
                handleInput={handleInput} 
                formData={formData} />
            </form>
        </div>

    )
}

export default CreateDeck;