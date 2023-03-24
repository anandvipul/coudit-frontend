import React from "react";
import "./style.css";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import helperFunction from "./HelperFunctions/HelperFunctions";

import UserProfile from "./Pages/UserProfile";

import HomePrivate from "./Pages/Private/HomePrivate";
import Compose from "./Pages/Private/Compose";
import Settings from "./Pages/Private/Settings";
import Profile from "./Pages/Private/Profile";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isSignedIn: false,
      loginError: "",
      signUpError: "",
    };
  }

  handleSignIn = async (body) => {
    helperFunction.signInUser(body).then(async (data) => {
      if (data.errors) {
        console.log(data);
        this.setState({
          isSignedIn: false,
          loginError: "email or password" + data.errors["email or password"],
        });
      } else {
        await localStorage.setItem("user", JSON.stringify(data));
        this.setState({
          user: { ...data.user },
          isSignedIn: true,
        });
      }
    });
  };

  handleSignUp = (body) => {
    // console.log(body);
    helperFunction.signUpUser(body).then(async (data) => {
      if (data.errors) {
        console.log(data);
        this.setState({
          isSignedIn: false,
          signUpError:
            "email" +
            data.errors["email"] +
            "username" +
            data.errors["username"],
        });
      } else {
        await localStorage.setItem("user", JSON.stringify(data));
        this.setState({
          user: { ...data.user },
          isSignedIn: true,
        });
      }
    });
  };

  handleSignOut = async (event) => {
    event.preventDefault();
    helperFunction
      .signOutUser()
      .then(async () => this.setState({ isSignedIn: false }));
  };

  isSignedIn = () => {
    // console.log(JSON.parse(localStorage.getItem("user")).user);
    // return this.state.user.token !== null;

    let data = JSON.parse(localStorage.getItem("user"));
    if (data !== null) {
      // console.log(data);

      if (data.user !== undefined) {
        // console.log(data.user);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

    // return JSON.parse(localStorage.getItem("user")) !== null;
  };

  render() {
    console.log("rendered container");
    return (
      <>
        <BrowserRouter>
          <Routes>
            {/* Protected Routes Begin */}
            <Route
              exact
              path="/"
              element={
                this.isSignedIn() ? (
                  <HomePrivate
                    handleSignOut={this.handleSignOut}
                    user={this.state.user}
                  />
                ) : (
                  <Home />
                )
              }
            />
            <Route
              path="/:username"
              element={<UserProfile handleSignOut={this.handleSignOut} />}
            />

            <Route
              exact
              path="/compose"
              element={
                this.isSignedIn() ? (
                  <Compose
                    user={this.state.user}
                    handleSignOut={this.handleSignOut}
                  />
                ) : (
                  <>
                    <Home />
                  </>
                )
              }
            />

            <Route
              exact
              path="/settings"
              element={
                this.isSignedIn() ? (
                  <Settings
                    user={this.state.user}
                    handleSignOut={this.handleSignOut}
                  />
                ) : (
                  <>
                    <Home />
                  </>
                )
              }
            />

            <Route
              exact
              path="/profile"
              element={
                this.isSignedIn() ? (
                  <Profile
                    user={this.state.user}
                    handleSignOut={this.handleSignOut}
                  />
                ) : (
                  <>
                    <Home />
                  </>
                )
              }
            />
            <Route
              path="/signin"
              element={
                <SignIn
                  onSubmit={this.handleSignIn}
                  isSignedIn={this.isSignedIn}
                  errors={this.state.loginError}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <SignUp
                  onSubmit={this.handleSignUp}
                  isSignedIn={this.isSignedIn}
                  errors={this.state.signUpError}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default Container;
