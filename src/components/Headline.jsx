import React from "react";

function Headline() {
  return (
    <div className="flex-container center">
      <img src="/images/logo black.png" alt="" className="header-picture" />
      <div className="flex-container flex-column">
        <h1 className="center">Burger Drop</h1>
        <p className="center welcome-text">
          Welcome to the dropping burger joint
        </p>
      </div>
    </div>
  );
}

export default Headline;
