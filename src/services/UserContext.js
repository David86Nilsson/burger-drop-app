import React, { useContext, useState } from "react";

const UserContext = React.createContext();

export function useAuth() {
  return useContext(UserContext);
}

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
