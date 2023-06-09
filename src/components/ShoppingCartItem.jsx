import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function ShoppingCartItem({ item, add, remove }) {
  return (
    <div className="flex-container center margin-top border-bottom">
      <p className="name-large">{item.name}</p>
      <p className="name-large margin-left-100">{item.quantity} st</p>
      <p className="price-large margin-left-100">{item.price} kr</p>
      {add ? (
        <div className="flex-container center">
          <div onClick={add} className="icons">
            <FontAwesomeIcon
              icon={faPlus}
              size="2xl"
              id={item.id}
              className="margin-left black icons"
            />
          </div>
          <div id={item.id} onClick={remove} className="icons">
            <FontAwesomeIcon
              icon={faMinus}
              size="2xl"
              id={item.id}
              className="margin-left black icons"
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ShoppingCartItem;
