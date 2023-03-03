import { createContext, useState } from "react";

const AppStateContext = createContext();

const AppStateProvider = ({ children }) => {
  const [userJoined, setUserJoined] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <AppStateContext.Provider
      value={{ userJoined, setUserJoined, username, setUsername }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export { AppStateContext, AppStateProvider };
