import React from "react";
import { Link } from "react-router-dom";

function DeckForm({ handleInput, formData }) {

return (

        <div>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" value={formData.name} placeholder="Deck Name" onChange={handleInput} />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" value={formData.description} placeholder="Brief description of the deck" onChange={handleInput} />
            </div>
            <div>
                <Link to="/" className="btn btn-secondary mt-3 mr-3">Cancel</Link>
                <button
                      className="btn btn-primary mt-3">
                      Submit
                </button>
            </div>
        </div>
)

}

export default DeckForm;