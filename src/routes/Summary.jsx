import React, { useState, useEffect } from "react";
import { CartManager } from "../services/CartManager";
import ShoppingCartItem from "../components/ShoppingCartItem";

function Summary() {
  const [cartItems, setCartItems] = useState(false);
  const [readyTime, setReadyTime] = useState();
  const [userId, setUserId] = useState();
  const [adress, setAdress] = useState(false);

  useEffect(() => {
    getLocalStorageItems();
    getLocalStorageUserId();
    getLocalStorageAdress();
    setReadyTime(CartManager.randomTime(20, 60));
    emptyLocalStorageItems();
  }, []);

  useEffect(() => {
    if (userId != undefined && adress && cartItems) {
      saveOrder();
    } else if (userId) {
      setUserId(0);
    }
  }, [userId]);

  const getLocalStorageUserId = async () => {
    let localStorageUserId = localStorage.getItem("user");
    if (!localStorageUserId) {
      localStorageUserId = null;
    } else {
      setUserId(JSON.parse(localStorageUserId));
    }
  };

  const getLocalStorageItems = async () => {
    let localStorageItems = localStorage.getItem("menyitems");
    if (!localStorageItems) {
      localStorageItems = [];
    } else {
      setCartItems(JSON.parse(localStorageItems));
    }
  };
  const getLocalStorageAdress = async () => {
    let localStorageItems = localStorage.getItem("adress");
    if (!localStorageItems) {
      localStorageItems = [];
    } else {
      setAdress(JSON.parse(localStorageItems));
    }
  };

  async function saveOrder() {
    const order = {
      userId: { userId },
      adress: { adress },
      cartItems: { cartItems },
    };

    if (adress && cartItems) {
      await fetch("http://localhost:7000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
    }
  }

  function emptyLocalStorageItems() {
    localStorage.removeItem("menyitems");
  }

  if (cartItems) {
    return (
      <div className="shoppingCart-container">
        <div className="center">
          {cartItems.map((i) => (
            <ShoppingCartItem key={i.id} item={i} />
          ))}
          <h3>Your order will be done in {readyTime} minutes</h3>
        </div>
      </div>
    );
  }
}

export default Summary;
