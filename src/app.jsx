import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/Main/Main";
import Auth from "./pages/Auth/Auth";
import Search from "./pages/Search/Search";
import Results from "./pages/Results/Results";

import "./css_common/desktop.css";
import "./css_common/mobile.css";

createRoot(document.getElementById("app-root")).render(
    <StrictMode> 
      <BrowserRouter>  

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/search" element={<Search />} />
          <Route path="/results" element={<Results />} />
        </Routes>
  
      </BrowserRouter>
    </StrictMode>

);
