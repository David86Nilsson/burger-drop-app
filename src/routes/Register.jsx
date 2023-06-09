import React, { useEffect, useState } from "react";
import Adress from "../components/Adress";
import { ValidationManager } from "../services/ValidationService";
import { v4 as uuidv4 } from "uuid";

function Register() {
  const [newUser, setNewUser] = useState({
    id: uuidv4(),
    username: "",
    password: "",
    adress: { city: "", street: "", nbr: "", email: "" },
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onUsernameChange = (e) => {
    setNewUser((props) => ({
      ...props,
      username: e.target.value,
    }));
  };

  const onPasswordChange = (e) => {
    setNewUser((props) => ({
      ...props,
      password: e.target.value,
    }));
  };

  const onCityChange = (e) => {
    setNewUser((props) => ({
      ...props,
      adress: {
        ...props.adress,
        city: e.target.value,
      },
    }));
  };

  const onStreetChange = (e) => {
    setNewUser((props) => ({
      ...props,
      adress: {
        ...props.adress,
        street: e.target.value,
      },
    }));
  };

  const onNbrChange = (e) => {
    setNewUser((props) => ({
      ...props,
      adress: {
        ...props.adress,
        nbr: e.target.value,
      },
    }));
  };
  const onEmailChange = (e) => {
    setNewUser((props) => ({
      ...props,
      adress: {
        ...props.adress,
        email: e.target.value,
      },
    }));
  };

  async function addRegistration() {
    setErrorMessage("");
    let validatedAdress = ValidationManager.validateAdress(newUser.adress);
    let validatedUserName = ValidationManager.validateUserName(
      newUser.username
    );
    let validatedPassword = ValidationManager.validatePassword(
      newUser.password
    );
    if (validatedAdress && validatedUserName && validatedPassword) {
      await fetch("http://localhost:7000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      window.location.href = "/";
    } else {
      if (!validatedAdress) {
        setErrorMessage("Not a valid adress!");
      }
      if (!validatedUserName) {
        setErrorMessage("Not a valid username!");
      }
      if (!validatedPassword) {
        setErrorMessage("Not a valid password!");
      }
    }
  }

  return (
    <div className="flex-container center margin-top">
      <div className="flex-container flex-column end">
        <div className="margin-top flex-container end">
          <p className="larger">UserName: </p>
          <input type="text" id="usernameInput" onChange={onUsernameChange} />
        </div>
        <div className="margin-top flex-container end">
          <p className="larger">Password: </p>
          <input
            type="password"
            id="passwordInput"
            onChange={onPasswordChange}
          />
        </div>
        <Adress
          onCityChange={onCityChange}
          onStreetChange={onStreetChange}
          onNbrChange={onNbrChange}
          adress={newUser.adress}
        />
        <div className="margin-top">
          <button onClick={addRegistration}>Register</button>
        </div>
        {errorMessage ? <p className="larger">{errorMessage}</p> : <div></div>}
      </div>
    </div>
  );
}

export default Register;
