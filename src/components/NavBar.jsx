import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../services/UserContext";
import LogIn from "./LogInWindow";

function NavBar() {
  const [loginWindow, setLoginWindow] = useState();
  const [lsUser, setLsUser] = useState();

  useEffect(() => {
    getLocalStorageUser();
  }, []);

  const getLocalStorageUser = async () => {
    let localStorageUser = localStorage.getItem("user");
    if (!localStorageUser) {
      localStorageUser = null;
    } else {
      setLsUser(JSON.parse(localStorageUser));
    }
  };

  function showLogin() {
    if (loginWindow === true) {
      setLoginWindow(false);
    } else {
      setLoginWindow(true);
    }
  }
  function logOut() {
    localStorage.removeItem("user");
    setLsUser(null);
    window.location.href = "/";
  }

  return (
    <nav className="flex-container between">
      <div className="">
        <Link to="/">
          <button className="margin-left">
            <div className="flex-container center">
              <FontAwesomeIcon icon={faHouse} />
              <p>Home</p>
            </div>
          </button>
        </Link>
      </div>
      <div className="flex-container">
        <Link to={"/cart"}>
          <button>ShoppingCart</button>
        </Link>
        {lsUser ? (
          <div className="flex-container">
            <button onClick={logOut}>Log Out</button>
          </div>
        ) : (
          <div className="flex-container">
            <Link to={"/register"}>
              <button variant="contained">Register</button>
            </Link>
            <button variant="contained" onClick={showLogin}>
              Log In
            </button>
          </div>
        )}
      </div>
      {loginWindow ? <LogIn close={showLogin} /> : null}
    </nav>
  );
}

export default NavBar;
