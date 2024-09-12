import { createContext, useState } from "react";

export const IsAdminContext = createContext("");

export const IsAdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <IsAdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </IsAdminContext.Provider>
  );
};
