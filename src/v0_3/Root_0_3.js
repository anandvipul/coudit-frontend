import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { createContext, useReducer } from "react";
import SignIn from "./Pages/SignIn";
import Header from "./components/Header";
import Home from "./Pages/Home";
import SignOut from "./Pages/SignOut";
import Compose from "./Pages/Compose";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";
import utilityFunctions from "./services/HelperFunctionV0_2";

export const UserContext = createContext();
const initialState = utilityFunctions.admin.isSignedIn()
  ? utilityFunctions.accessProtected.currentUserLocal().user
  : "";

export default function Root() {
  const [user, setUser] = useReducer((user) => {
    if (utilityFunctions.admin.isSignedIn()) {
      return utilityFunctions.accessProtected.currentUserLocal().user;
    } else {
      return "";
    }
  }, initialState);
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
                  <Route path={"compose"} element={<Compose />} />
                  <Route path={"settings"} element={<Settings />} />
                  <Route path={"profile"} element={<Profile />} />
                  <Route path={"/:username"} element={<Profile />} />
                </Routes>
              </BrowserRouter>
            </>
          );
        }}
      </UserContext.Consumer>
    </UserContext.Provider>
  );
}
