import React from "react";
import { Link } from "react-router-dom";
import "../Layout/style.css"

function CardForm({ 
    handleCardInput, 
    cardFormData, 
    addCardDoneHandler, 
    isNewCard, 
    card }) {

    const initialValues = {
        front: isNewCard ? "Front of card" : card.front,
        back: isNewCard ? "Back of card" : card.back,
    }

    return (

            <div>
                <div>
                    <label htmlFor="front">Front</label>
                    <textarea name="front" id="front" value={cardFormData.front} placeholder={initialValues.front} onChange={handleCardInput} />
                </div>
                <div>
                    <label htmlFor="back">Back</label>
                    <textarea name="back" id="back" value={cardFormData.back} placeholder={initialValues.back} onChange={handleCardInput} />
                </div>
                <div>
                    <Link to className="btn btn-secondary mt-3 mr-3" onClick={addCardDoneHandler}>Done</Link>
                    <button
                        className="btn btn-primary mt-3">
                        Save
                    </button>
                </div>
            </div>
    )
    
}

export default CardForm;