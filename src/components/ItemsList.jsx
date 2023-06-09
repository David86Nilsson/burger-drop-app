import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";

function ItemsList({ items, user, toggleFavorites }) {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(3);
  const [visibleItems, setVisibleItems] = useState([]);
  const [isMaxReached, setIsMaxReached] = useState();
  const [isMinReached, setIsMinReached] = useState(true);

  useEffect(() => {
    setVisibleItems(items.slice(startIndex, endIndex));
    if (endIndex >= items.length) {
      setIsMaxReached(true);
    }
    if (startIndex <= 0) {
      setIsMinReached(true);
    }
  }, [startIndex]);

  function higherIndex() {
    setEndIndex(endIndex + 3);
    setStartIndex(startIndex + 3);
    setIsMinReached(false);
  }

  function lowerIndex() {
    setEndIndex(endIndex - 3);
    setStartIndex(startIndex - 3);
    setIsMaxReached(false);
  }

  if (items) {
    return (
      <div className="flex-container align-center margin-left">
        {isMinReached ? (
          <div className="margin-left"></div>
        ) : (
          <FontAwesomeIcon
            icon={faCircleChevronLeft}
            size="2xl"
            className="icons align-center direction"
            onClick={lowerIndex}
          />
        )}
        <div className="items-container">
          {visibleItems.map((i) => (
            <ItemCard
              key={i.id}
              item={i}
              user={user}
              toggleFavorites={toggleFavorites}
            />
          ))}
        </div>
        {isMaxReached ? (
          <div></div>
        ) : (
          <FontAwesomeIcon
            icon={faCircleChevronRight}
            size="2xl"
            className="icons align-center direction"
            onClick={higherIndex}
          />
        )}
      </div>
    );
  }
}

export default ItemsList;
