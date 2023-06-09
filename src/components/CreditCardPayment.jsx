import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ValidationManager } from "../services/ValidationService";

function CreditCardPayment() {
  const [card, setCard] = useState({
    cardnumber: "",
    owner: "",
    cvc: "",
    month: 6,
    year: 2023,
  });
  const [cardIsValidated, setCardIsValidated] = useState(false);

  const cardNumberEntry = (e) => {
    setCard({ ...card, cardnumber: e.target.value });
  };
  const ownerEntry = (e) => {
    setCard({ ...card, owner: e.target.value });
  };
  const cVcEntry = (e) => {
    setCard({ ...card, cvc: e.target.value });
  };
  const monthEntry = (e) => {
    setCard({ ...card, month: e.target.value });
  };
  const yearEntry = (e) => {
    setCard({ ...card, year: e.target.value });
  };

  useEffect(() => {
    setCardIsValidated(ValidationManager.validateCard(card));
  }, [card]);

  return (
    <div className="flex-container flex-column">
      <form>
        <div className="flex-container end">
          <p className="larger">Card Nbr: </p>
          <input
            type="text"
            value={card.cardnumber}
            onChange={cardNumberEntry}
            maxLength={16}
          ></input>
        </div>
        <div className="flex-container end margin-top">
          <p className="larger">Card owner: </p>
          <input type="text" value={card.owner} onChange={ownerEntry}></input>
        </div>
        <div className="flex-container end margin-top">
          <p className="larger">Month/Year: </p>
          <input
            type="number"
            value={card.month}
            onChange={monthEntry}
            max={12}
            min={1}
            className="numberInput margin-left"
          />
          <span className="larger"> / </span>
          <input
            type="number"
            value={card.year}
            onChange={yearEntry}
            max={2030}
            min={2023}
            className="numberInput"
          />
        </div>
        <div className="flex-container end margin-top">
          <p className="larger">Cvc: </p>
          <input
            type="text"
            value={card.cvc}
            onChange={cVcEntry}
            className="numberInput"
          ></input>
        </div>
        {cardIsValidated ? (
          <Link to={"/summary"}>
            <button type="submit">Pay with card</button>
          </Link>
        ) : (
          <button disabled className="larger disabled">
            Fill in info
          </button>
        )}
      </form>
    </div>
  );
}

export default CreditCardPayment;
