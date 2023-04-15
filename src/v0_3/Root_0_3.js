import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { createContext } from "react";
import SignIn from "./Pages/SignIn";
import Header from "./components/Header";
import Home from "./Pages/Home";
import SignOut from "./components/SignOut";

export const UserContext = createContext();

export default function Root() {
  return (
    <UserContext.Provider value={{ user: {} }}>
      <UserContext.Consumer>
        {(data) => {
          return (
            <>
              <BrowserRouter>
                <Header />
                <Routes>
                  <Route path={"/"} element={<Home />} />
                  <Route path={"signin"} element={<SignIn />} />
                  <Route path={"signout"} element={<SignOut />} />
                </Routes>
              </BrowserRouter>
            </>
          );
        }}
      </UserContext.Consumer>
    </UserContext.Provider>
  );
}
