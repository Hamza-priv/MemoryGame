import React, { useEffect, useState } from "react";

import SingleCard from "./SingleCard";

const cardImages = [
  { src: "../img/helmet-1.png", matched: false },
  { src: "../img/potion-1.png", matched: false },
  { src: "../img/ring-1.png", matched: false },
  { src: "../img/scroll-1.png", matched: false },
  { src: "../img/sword-1.png", matched: false },
  { src: "../img/shield-1.png", matched: false },
];
function ShuffleCard() {
  const [Cards, setCards] = useState([]);
  const [ChoiceOne, setChoiceOne] = useState(null);
  const [ChoiceTwo, setChoiceTwo] = useState(null);
  const [Turn, setTurn] = useState(0);
  const [Disabled, setDisabled] = useState(false)

  const shuffleCard = () => {
    const ShuffleCard = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(ShuffleCard);
    setTurn(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const handleChoice = async (card) => {
    ChoiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };
  useEffect(() => {
    if (ChoiceOne && ChoiceTwo) {
        setDisabled(true);
      if (ChoiceOne.src === ChoiceTwo.src) {
        setCards((prevCard) => {
          return prevCard.map((card) => {
            if (card.src === ChoiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 700);
      }
    }
  }, [ChoiceOne, ChoiceTwo]);

  useEffect(() => {
    shuffleCard();
  }, [])
  
  return (
    <>
      <button type="button" class="btn btn-dark" onClick={shuffleCard}>
        New Game
      </button>
      <p className="Turn"><strong>Turns: </strong>{Turn}</p>
      <div className="imageGrid">
        {Cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === ChoiceOne || card === ChoiceTwo || card.matched}
            Disabled={Disabled}
          />
        ))}
      </div>
     
    </>
  );
}

export default ShuffleCard;
