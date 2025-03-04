import { ThemeProvider } from "@zendeskgarden/react-theming";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Settings from "./components/Settings";
import Customers from "./components/Customers";

function App() {
  return (
    <div>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="settings" element={<Settings />} />
            <Route path="customers" element={<Customers />} />
          </Routes>
          <Home />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
