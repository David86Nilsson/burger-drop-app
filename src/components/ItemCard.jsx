import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { colorManager } from "../services/ColorService";

function ItemCard({ item, user, toggleFavorites }) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (user != undefined) {
      if (user.favorites != undefined) {
        setRender(true);
      }
    }
  }, []);

  async function favoriteClick(e) {
    toggleFavorites(e, item.id);
  }

  return (
    <div className="itemcard">
      <Link to={`/${item.id}`}>
        <img src={item.image} alt="" className="item-image" />
        <h4>{item.name}</h4>
        <p>{item.description}</p>
      </Link>
      {render ? (
        <div onClick={favoriteClick} id={item.id} className="icons">
          <FontAwesomeIcon
            icon={faHeart}
            id={item.id}
            className={colorManager.favorite(item.id, user.favorites)}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default ItemCard;
