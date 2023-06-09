import React, { useEffect, useState } from "react";
import ShoppingCartItem from "../components/ShoppingCartItem";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { CartManager } from "../services/CartManager";

function ShoppingCart() {
  const [cartItems, setCartItems] = useState();

  useEffect(() => {
    getLocalStorageItems();
  }, []);

  const getLocalStorageItems = async () => {
    let localStorageItems = localStorage.getItem("menyitems");
    if (!localStorageItems) {
      localStorageItems = [];
    } else {
      setCartItems(JSON.parse(localStorageItems));
    }
  };

  async function addToCart(e) {
    let itemsInCart = localStorage.getItem("menyitems");
    let target = e.target;
    while (target.tagName != "svg") {
      target = target.parentNode;
    }
    if (!itemsInCart) {
      itemsInCart = [];
    } else {
      itemsInCart = JSON.parse(itemsInCart);
    }
    let cartItem = await itemsInCart.find((i) => i.id == target.id);

    if (cartItem) {
      cartItem.quantity++;
    }

    localStorage.setItem("menyitems", JSON.stringify(itemsInCart));
    setCartItems(itemsInCart);
  }
  async function removeFromCart(e) {
    let itemsInCart = localStorage.getItem("menyitems");

    if (!itemsInCart) {
      itemsInCart = [];
    } else {
      itemsInCart = JSON.parse(itemsInCart);
    }
    let cartItem = await itemsInCart.find((i) => i.id == e.target.id);

    if (cartItem) {
      if (cartItem.quantity === 1) {
        let temp = await itemsInCart.filter((item) => item.id != e.target.id);
        localStorage.setItem("menyitems", JSON.stringify(temp));
        setCartItems(temp);
      } else {
        cartItem.quantity--;
        localStorage.setItem("menyitems", JSON.stringify(itemsInCart));
        setCartItems(itemsInCart);
      }
    }
  }

  if (cartItems && cartItems.length > 0) {
    return (
      <div className="shoppingCart-container">
        <div className="center">
          {cartItems.map((i) => (
            <ShoppingCartItem
              key={uuidv4()}
              item={i}
              add={addToCart}
              remove={removeFromCart}
              id={i.id}
              className="border-bottom"
            />
          ))}
          <p className="name-large">
            Total price: {CartManager.calculateAmount(cartItems)}
          </p>
          <Link to={"/pay"}>
            <button>Order</button>
          </Link>
        </div>
      </div>
    );
  } else {
    return <div className="margin-top center">No items in cart</div>;
  }
}

export default ShoppingCart;
