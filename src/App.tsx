/* eslint-disable @arthurgeron/react-usememo/require-usememo */
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Settings from "./components/Settings";
import Customers from "./components/Customers";
import React, { createContext, useState } from "react";

export const KeyContext = createContext("");

const App = React.memo(() => {
  const [apiKey, setApiKey] = useState("");

  const updateKey = (value: string) => {
    setApiKey(value);
  };

  return (
    <div>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={
                <KeyContext.Provider value={apiKey}>
                  <Home />
                </KeyContext.Provider>
              }
            />
            <Route
              path="settings"
              element={<Settings updateKey={updateKey} />}
            />
            <Route path="customers" element={<Customers />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
});

export default App;
