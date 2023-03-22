import React from "react";
import "./style.css";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Elements/Header";
import Hero from "./Elements/Hero";
import Main from "./Elements/Main";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import helperFunction from "./HelperFunctions/HelperFunctions";
import PrivateRoutes from "./Pages/PrivateRouter";
import HomePrivate from "./Pages/Private/HomePrivate";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  handleSignIn = (body) => {
    helperFunction.signInUser(body).then((data) => {
      this.setState(
        {
          user: { ...data.user },
        },
        () => {
          console.log(this.state);
          localStorage.setItem("user", JSON.stringify(this.state.user));
        }
      );
    });
    <Navigate to="/" user={this.state.user} />;
  };

  handleSignUp = (body) => {
    // console.log(body);
    helperFunction.signUpUser(body).then((data) => {
      console.log(data);
    });
  };

  handleConditionalRoutes = () => {
    return localStorage.getItem("user") !== null;
  };

  render() {
    return (
      <>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route
              path="/"
              element={
                this.handleConditionalRoutes() ? <HomePrivate /> : <Home />
              }
            />
            <Route path="/" element={<Home />} />
            <Route
              path="/signin"
              element={<SignIn onSubmit={this.handleSignIn} />}
            />
            <Route
              path="/signup"
              element={<SignUp onSubmit={this.handleSignUp} />}
            />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default Container;
