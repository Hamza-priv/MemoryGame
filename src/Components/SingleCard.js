import React from "react";

function SingleCard(props) {
  const { card, handleChoice, flipped, Disabled } = props;

  const onClick = () => {
    if (!Disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="Front" src={card.src} alt="cardFront" />
        <img
          className="Back"
          onClick={onClick}
          src="../img/cover.png"
          alt="cardBack"
        />
      </div>
    </div>
  );
}

export default SingleCard;
