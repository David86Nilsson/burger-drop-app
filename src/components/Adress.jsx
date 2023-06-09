import React, { useEffect, useState } from "react";

function Adress({ onCityChange, onStreetChange, onNbrChange, adress }) {
  const [currentAdress, setCurrentAdress] = useState();
  useEffect(() => {
    if (adress) {
      setCurrentAdress(adress);
    } else {
      setCurrentAdress({
        city: "",
        street: "",
        nbr: "",
      });
    }
  }, [adress]);
  if (currentAdress)
    return (
      <div>
        <div className="flex-container end margin-top">
          <p className="larger">City: </p>
          <input
            type="text"
            value={currentAdress.city}
            onChange={onCityChange}
          />
        </div>
        <div className="flex-container end margin-top">
          <p className="larger">Street: </p>
          <input
            type="text"
            value={currentAdress.street}
            onChange={onStreetChange}
          />
        </div>
        <div className="flex-container end margin-top">
          <p className="larger">Street number: </p>
          <input
            type="text"
            value={currentAdress.nbr}
            className="numberInput"
            onChange={onNbrChange}
          />
        </div>
        {/* <div className="flex-container end margin-top">
        <p>Email: </p>
        <input type="text" className="" onChange={onEmailChange} />
      </div> */}
      </div>
    );
}

export default Adress;
