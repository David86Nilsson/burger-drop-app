import React, { useEffect, useState } from "react";
import { useAuth } from "../services/UserContext";
import { Link } from "react-router-dom";

function LogIn({ close }) {
  const [allUsers, setAllUsers] = useState();
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    fetch("http://localhost:7000/users")
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
      });
  }, []);
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const UserNameEntry = (e) => {
    setUserName(e.target.value);
  };
  const PasswordEntry = (e) => {
    setPassword(e.target.value);
  };

  function Login() {
    let loggedInUser = allUsers.find(
      (u) => u.username === userName && u.password === password
    );
    if (loggedInUser) {
      setCurrentUser(loggedInUser.id);
    }
  }
  if (allUsers) {
    return (
      <div className="flex-container flex-column loginWindow" id="loginWindow">
        <form className="grid-container">
          <p className="end margin-top larger">Username: </p>
          <input
            className="margin-top"
            type="text"
            id="userNameInput"
            value={userName}
            onInput={UserNameEntry}
          />
          <p className="end margin-top larger">Password: </p>
          <input
            className="margin-top"
            type="text"
            id="PasswordInput"
            value={password}
            onInput={PasswordEntry}
          />
          <div></div>
          <button className="margin-top" type="submit" onClick={Login}>
            Log in
          </button>
        </form>
        <button onClick={close} className="margin-top close-button">
          Close
        </button>
      </div>
    );
  }
}

export default LogIn;
