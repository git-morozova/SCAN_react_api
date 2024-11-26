import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Main from "./pages/Main/Main";
import Auth from "./pages/Auth/Auth";
import Search from "./pages/Search/Search";
import Results from "./pages/Results/Results";

import "./css_common/desktop.css";
import "./css_common/mobile.css";
import Store from "./store/store";

interface State {store: Store}
const store = new Store();
export const Context = createContext<State>({store})

const isAuth = localStorage.getItem("token");
if(isAuth) {
  store.setAuth(true);
}

createRoot(document.getElementById("app-root")).render(
    <StrictMode> 
      <Context.Provider value={{store}}>

      <BrowserRouter>  
        <Routes>
          <Route exact path="/" element={<Main />} />
          {store.checkAuth() ? (
            <Route path="/auth" element={<Main />} /> 
            ) : (
            <Route path="/auth" element={<Auth />} />
          )}
          <Route path="/search" element={<Search />} />
          <Route path="/results" element={<Results />} /> 
          <Route path="*" element={<Main />} />         
        </Routes>  
      </BrowserRouter>

      </Context.Provider>
    </StrictMode>
);
