import React, {useState, useEffect} from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch, useHistory } from "react-router-dom";
import Decks from "../Deck/Decks";
import Study from "../Deck/Study"
import DeckOverview from "../Deck/DeckOverview";
import CreateDeck from "../Deck/CreateDeck"
import { 
  listDecks, createDeck, 
  readDeck, createCard, 
  deleteDeck, deleteCard, } from "../utils/api";
import EditDeck from "../Deck/EditDeck";
import AddCard from "../Card/AddCard";
import EditCard from "../Card/EditCard";

function Layout() {

  const history = useHistory();
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState({cards: []});
  const [cards, setCards] = useState([]);
  
  let initialFormData = {

      "name": "",
      "description": "",

  }

  let initialCardFormData = {
    "front": "",
    "back": ""
  }

  const [formData, setFormData] = useState(initialFormData);
  const [cardFormData, setCardFormData] = useState(initialFormData);

  useEffect(() => {
      listDecks().then((data) => setDecks(data));
    }, []);

  function handleInput(event) {
      setFormData({...formData, [event.target.name]: event.target.value
      });
  }

  function handleCardInput(event){
    setCardFormData({...cardFormData, [event.target.name]: event.target.value})
  }

  function submitHandler(event){
    event.preventDefault();
    createDeck(formData);
    setFormData(initialFormData);
    history.push("/");
    listDecks().then((data) => setDecks(data));
  } 

  function addCardDoneHandler(event){
    event.preventDefault();
    history.goBack();
    readDeck().then((data)=>setDeck(data));
  }


  useEffect(() => {
    setCards(deck.cards || []);
  }, [deck]);

function addCardFormHandler(event) {
  event.preventDefault();
    createCard(deck.id, cardFormData).then((data) => {
      setCards([...cards, data])
      setCardFormData(initialCardFormData);
    });
  }

function handleDeckDelete(deckId) {
  const confirmDelete = window.confirm("Delete this deck? You will not be able to recover it.");
  if (confirmDelete) {
    deleteDeck(deckId).then(() => {
      listDecks().then((data) => setDecks(data));
    });
    history.push("/");
  } else {
    return;
  }
}

function handleCardDelete(cardId, deckId) {
  const confirmCardDelete = window.confirm("Delete this card? You will not be able to recover it.");
  if (confirmCardDelete) {
    deleteCard(cardId)
      .then(() => {
        readDeck(deckId).then((data) => setDeck(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}


  return (
    <div>
      <Header />
      <div className="container">
  
        <Switch>

          <Route exact path ="/">
            <Decks decks={decks} setDecks={setDecks} handleDeckDelete={handleDeckDelete} />
          </Route>

          <Route exact path ="/decks/:deckId/study">
            <Study deck={deck} setDeck={setDeck}/>
          </Route>

          <Route exact path = "/decks/new">
            <CreateDeck
             submitHandler={submitHandler} 
             handleInput={handleInput} 
             formData={formData} />
          </Route>

          <Route exact path = "/decks/:deckId">
            <DeckOverview 
              deck={deck}
              setDeck={setDeck}
              readDeck={readDeck}
              handleDeckDelete={handleDeckDelete}
              handleCardDelete={handleCardDelete}/>
          </Route>

          <Route exact path = "/decks/:deckId/edit">
            <EditDeck 
              submitHandler={submitHandler} 
              handleInput={handleInput} 
              formData={formData} 
              setFormData={setFormData} 
              decks={decks} 
              setDecks={setDecks}/>
          </Route>

          <Route exact path = "/decks/:deckId/cards/new">
            <AddCard 
              handleCardInput={handleCardInput}
              cardFormData={cardFormData}
              setCardFormData={setCardFormData}
              addCardFormHandler={addCardFormHandler}
              initialCardFormData={initialCardFormData}
              addCardDoneHandler={addCardDoneHandler}
            />
          </Route>

          <Route exact path = "/decks/:deckId/cards/:cardId/edit">
            <EditCard 
              deck={deck}
              setDeck={setDeck}
              handleCardInput={handleCardInput}
              cards={cards} setCards={setCards}
              cardFormData={cardFormData}
              setCardFormData={setCardFormData}
            />
          </Route>

          <Route>
            <NotFound />
          </Route>

        </Switch>

      </div>
    </div>
  );
}

export default Layout;
