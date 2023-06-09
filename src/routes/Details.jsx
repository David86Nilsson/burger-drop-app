import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Details() {
  const { itemId } = useParams();
  const [item, setItem] = useState();

  useEffect(() => {
    fetch(`http://localhost:7000/menyitems/${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
      });
  }, []);

  function addToCart() {
    let itemsInCart = localStorage.getItem("menyitems");

    if (!itemsInCart) {
      itemsInCart = [];
    } else {
      itemsInCart = JSON.parse(itemsInCart);
    }
    let cartItem = itemsInCart.find((i) => item.id === i.id);

    if (cartItem) {
      cartItem.quantity++;
    } else {
      cartItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      };
      itemsInCart.push(cartItem);
    }

    localStorage.setItem("menyitems", JSON.stringify(itemsInCart));
    window.location.href = "/cart";
  }

  if (item) {
    return (
      <div className="item-details">
        <div className="items-container">
          <div className="flex-container flex-column margin-right">
            <h4 className="name-large">{item.name}</h4>
            <p className="desc-large">{item.description}</p>
            <p className="price-large">{item.price} kr</p>
            <button type="submit" onClick={addToCart}>
              Add to order
            </button>
          </div>
          <img src={item.image} alt="" className="item-details-image" />
        </div>
      </div>
    );
  }
}

export default Details;
