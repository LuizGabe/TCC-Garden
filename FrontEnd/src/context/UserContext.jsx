import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('user', user);
  }, [user]);

  const updateUserContext = (id, token, userData) => {
    setUser({
      id,
      token,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      createdAt: userData.createdAt
    })
  }

  const clearUserContext = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, updateUserContext, clearUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };