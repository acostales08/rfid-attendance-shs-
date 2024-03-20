import React, { createContext, useContext, useState, useEffect } from 'react';

const userTypeContext = createContext();

const UserTypeProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : "";
    });

  return (
    <userTypeContext.Provider value={{ user, setUser}}>
      {children}
    </userTypeContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(userTypeContext);
  if (!context) {
    throw new Error("useUser must be used within UserTypeProvider");
  }
  return context;
};

export { UserTypeProvider, useUser };
