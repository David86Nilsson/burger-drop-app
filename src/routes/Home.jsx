import React, { useEffect, useState } from "react";
import ItemsList from "../components/ItemsList";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const [allMenyItems, setAllMenyItems] = useState();
  const [filteredItems, setFilteredItems] = useState();
  const [categorys, setCategorys] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [userId, setUserId] = useState();
  const [user, setUser] = useState();
  const [favorites, setFavorites] = useState();

  //UseEffects

  useEffect(() => {
    getLocalStorageUserId();

    fetch("http://localhost:7000/menyitems")
      .then((res) => res.json())
      .then((data) => {
        setAllMenyItems(data);
        setFilteredItems(data);
      });
  }, []);

  useEffect(() => {
    if (userId != undefined) {
      fetch(`http://localhost:7000/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (filteredItems) {
      setCategorys([...new Set(filteredItems.map((item) => item.category))]);
    }
  }, [filteredItems]);

  useEffect(() => {
    if (searchValue === "") {
      setFilteredItems(allMenyItems);
    } else {
      setFilteredItems(
        allMenyItems.filter((i) =>
          i.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue]);
  useEffect(() => {
    if (user) {
      setFavorites(user.favorites || []);
    }
  }, [user]);

  //Get local storage

  const getLocalStorageUserId = async () => {
    let localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      setUserId(JSON.parse(localStorageUser));
    }
  };

  const SearchEntry = (e) => {
    setSearchValue(e.target.value);
  };

  // Metoder for hantera förändringar i favoriter
  async function toggleFavorites(e, id) {
    let target = e.target;
    while (target.tagName != "svg" && target.tagName != "DIV") {
      target = target.parentNode;
    }
    if (user.favorites.includes(id)) {
      await removeFromFavorites(target, id);
    } else {
      await addToFavorites(target, id);
    }
  }
  async function addToFavorites(element, id) {
    const updatedFavorites = [...favorites, id];
    setFavorites(updatedFavorites);
    await saveUser(userId, updatedFavorites);
    element.classList.add("red");
  }

  async function removeFromFavorites(element, id) {
    const updatedFavorites = user.favorites.filter((f) => f != id);
    setFavorites(updatedFavorites);
    await saveUser(userId, updatedFavorites);
    element.classList.remove("red");
  }
  async function saveUser(id, updatedFavorites) {
    const newUser = { ...user, favorites: updatedFavorites };
    await fetch(`http://localhost:7000/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    setUser(newUser);
  }

  if (categorys) {
    return (
      <div className="relative">
        <div className="flex-container margin-top">
          <input
            type="text"
            className="margin-top margin-left"
            placeholder="Search"
            onChange={SearchEntry}
          />
        </div>
        {favorites && favorites.length > 0 ? (
          <div className="border-bottom">
            <div className="items-container margin-top align-center margin-left-20">
              <p className="category-name move-right">Favorites</p>
              <ItemsList
                items={allMenyItems.filter((i) => favorites.includes(i.id))}
                user={user}
                toggleFavorites={toggleFavorites}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {categorys.map((t) => (
          <div className="border-bottom" key={uuidv4()}>
            <div className="items-container margin-top align-center margin-left-20">
              <p className="category-name move-right">{t}</p>
              <ItemsList
                items={filteredItems.filter((i) => i.category === t)}
                user={user}
                toggleFavorites={toggleFavorites}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Home;
