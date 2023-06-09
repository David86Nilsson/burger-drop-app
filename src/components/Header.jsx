import React from "react";
import { Link } from "react-router-dom";
import Headline from "./Headline";
import NavBar from "./NavBar";

function Header() {
  return (
    <div className="header-container">
      <Headline />
      <NavBar />
    </div>
  );
}

export default Header;
