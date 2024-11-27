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

if(localStorage.getItem("token")) {
  const login: string = localStorage.getItem("login")!;
  store.setAuth(true);  
  store.setUser(login); 
  store.setTariff("beginner");  //задаем тариф жестко, т.к. в API нет инфы о тарифе для юзера
}

createRoot(document.getElementById("app-root")).render(
    <StrictMode> 
      <Context.Provider value={{store}}>

      <BrowserRouter>  
        <Routes>
          <Route exact path="/" element={<Main />} />
          {store.checkAuth() ? (
            <>
              <Route path="/auth" element={<Navigate to="/" replace />} /> 
              <Route path="/search" element={<Search />} />
              <Route path="/results" element={<Results />} /> 
            </>
            ) : (
            <Route path="/auth" element={<Auth />} />
          )}
          <Route path="*" element={<Navigate to="/" replace />} />         
        </Routes>  
      </BrowserRouter>

      </Context.Provider>
    </StrictMode>
);
