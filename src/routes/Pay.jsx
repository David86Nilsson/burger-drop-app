import React, { useState, useEffect } from "react";
import { CartManager } from "../services/CartManager";
import CreditCardPayment from "../components/CreditCardPayment";
import BankIdPayment from "../components/BankIdPayment";
import Adress from "../components/Adress";
import { ValidationManager } from "../services/ValidationService";

function Pay() {
  const [cartItems, setCartItems] = useState([]);
  const [amount, setAmount] = useState();
  const [isAdressValidated, setIsAdressValidated] = useState(false);
  const [user, setUser] = useState();
  const [adress, setAdress] = useState({
    city: "",
    street: "",
    nbr: "",
  });

  useEffect(() => {
    getLocalStorageItems();
    getLocalStorageUser();
  }, []);
  useEffect(() => {
    if (user != undefined) {
      setAdress(user.adress);
    }
  }, [user]);

  useEffect(() => {
    setAmount(CartManager.calculateAmount(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setIsAdressValidated(ValidationManager.validateAdress(adress));
  }, [adress]);

  useEffect(() => {
    if (isAdressValidated) {
      localStorage.setItem("adress", JSON.stringify(adress));
    }
  }, [isAdressValidated]);

  const getLocalStorageItems = async () => {
    let localStorageItems = localStorage.getItem("menyitems");
    if (!localStorageItems) {
      localStorageItems = [];
    } else {
      setCartItems(JSON.parse(localStorageItems));
    }
  };
  const getLocalStorageUser = async () => {
    let localStorageUser = localStorage.getItem("user");
    if (!localStorageUser) {
      localStorageUser = [];
    } else {
      let userId = JSON.parse(localStorageUser);
      await fetch(`http://localhost:7000/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        });
    }
  };

  const cityEntry = (e) => {
    setAdress({ ...adress, city: e.target.value });
  };
  const streetEntry = (e) => {
    setAdress({ ...adress, street: e.target.value });
  };
  const nbrEntry = (e) => {
    setAdress({ ...adress, nbr: e.target.value });
  };

  if (amount) {
    return (
      <div className="flex-container flex-column center margin-top">
        <h3>{amount} kr</h3>
        <div className="flex-container center gap">
          <div>
            <form>
              <Adress
                onCityChange={cityEntry}
                onStreetChange={streetEntry}
                onNbrChange={nbrEntry}
                adress={adress}
              />
            </form>
          </div>
        </div>
        {isAdressValidated ? (
          <div className="flex-container center margin-top gap">
            <CreditCardPayment />
            <BankIdPayment />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default Pay;
