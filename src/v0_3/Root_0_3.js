import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { createContext, useState } from "react";
import SignIn from "./Pages/SignIn";
import Header from "./components/Header";
import Home from "./Pages/Home";
import SignOut from "./Pages/SignOut";

export const UserContext = createContext();

export default function Root() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user }}>
      <UserContext.Consumer>
        {(data) => {
          return (
            <>
              <BrowserRouter>
                <Header />
                <Routes>
                  <Route path={"/"} element={<Home />}></Route>
                  <Route
                    path={"signin"}
                    element={<SignIn setUser={setUser} />}
                  />
                  <Route
                    path={"signout"}
                    element={<SignOut setUser={setUser} />}
                  />
                </Routes>
              </BrowserRouter>
            </>
          );
        }}
      </UserContext.Consumer>
    </UserContext.Provider>
  );
}
