import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import SingleCard from './components/SingleCard.jsx'

//propriété matched pour indiquer si carte trouvée.
const cardsImages = [
  { "src": "/assets/images/reading.jpg", matched: false },
  { "src": "/assets/images/sunback.jpg", matched: false },
  { "src": "/assets/images/swimming.jpg", matched: false },
  { "src": "/assets/images/reading2.jpg", matched: false },
  { "src": "/assets/images/love_summer.jpg", matched: false },
  { "src": "/assets/images/beach-people.jpg", matched: false }
]

function App() {
  const [cards, setCards] = useState([]) 
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  //shuffle cards
  const shuffledCards = () => {
    const shuffledCards = [...cardsImages, ...cardsImages] // Duplicate the array to create pairs
      .sort(() => Math.random() - 0.5)  // Shuffle the array randomly
      .map((card) => ({ ...card, id: Math.random() // Generate a unique ID for each card
      }))

    setCards(shuffledCards) // Set the shuffled cards to state
    setTurns(0) // Reset turns to 0
    setGameWon(false) // Reset gameWon state to false
  }

  //handle card choice
  // This function is called when a card is clicked
  const handleChoice = (card) => {
    console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo){
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src){
        setCards(prevCards => prevCards.map(card => (
          card.src === choiceOne.src ? { ...card, matched: true } : card
        )));
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])
  
  
  //reset choices
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1) // Increment the turn count
    setDisabled(false) // Enable card clicking again
  }

  // Check if the game is won
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setGameWon(true)
    }
  }, [cards])

  //start game automatically
  useEffect(() => {
    shuffledCards()
  }, [])

  return (
  <div className="App">
    <h1>Memory Match</h1>
    <button onClick={shuffledCards}>New Game</button>

    {gameWon && <div className="victory-message"> Bravo, tu as gagné en {turns} tours ! 🎉</div>}
    <p>Turns: {turns}</p>
    <div className="card-grid">
      {cards.map(card => (
        <SingleCard 
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
        />
      ))}
    </div>
  </div>
  ) 
}

export default App
