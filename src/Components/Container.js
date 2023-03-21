import React from "react";
import "./style.css";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Elements/Header";
import Hero from "./Elements/Hero";
import Main from "./Elements/Main";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default Container;
