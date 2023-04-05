import React from "react";
import "./Components/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./CustomContext/dataContext";
import LoaderScreen from "./Components/LoaderScreen";
import utilityFunctions from "./Components/HelperFunctions/HelperFunctionV0_2";
import Home from "./AppComponents/Home";
import SignIn from "./AppComponents/SignIn";
import SignUp from "./AppComponents/SignUp";
import Header from "./AppComponents/Header";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsHome: [],
      postTag: [],
      tags: [],
      loggedInState: {
        state: false,
        error: "",
        user: {},
      },
      activeMode: "global",
      activeTag: "",
    };
  }

  handleActiveMode = async (mode) => {
    if (mode === "global") {
      this.setState({ activeMode: mode });
    }
  };

  handleSignIn = async (body) => {
    let loggedinData = this.state.loggedInState;
    utilityFunctions.authenticateUser(body).then(async (data) => {
      if (data.errors) {
        loggedinData.state = false;
        loggedinData.error =
          "email or password" + data.errors["email or password"];
        this.setState({
          loggedInState: { ...loggedinData },
        });
      } else {
        // await localStorage.setItem("user", JSON.stringify(data));
        loggedinData.state = true;
        loggedinData.user = data;
        this.setState((prevState) => {
          return { ...prevState, loggedInState: { ...loggedinData } };
        });
      }
    });
  };

  handleSignUp = (body) => {
    // console.log(body);
    let loggedinData = this.state.loggedInState;
    utilityFunctions.registerUser(body).then(async (data) => {
      if (data.errors) {
        // console.log(data);
        loggedinData.error =
          "email" + data.errors["email"] + "username" + data.errors["username"];
        this.setState({
          loggedInState: { ...loggedinData },
        });
      } else {
        loggedinData.state = true;
        loggedinData.user = { ...data };
        localStorage.setItem("user", JSON.stringify(data));
        this.setState({
          loggedInState: { ...loggedinData },
        });
      }
    });
  };

  handleSignOut = async (event) => {
    event.preventDefault();
    utilityFunctions
      .signOutUser()
      .then(() => this.setState({ loggedInState: { state: false, user: {} } }));
  };

  activeTagHandler = async (tag) => {
    let selectedTag = tag.target.innerText;
    utilityFunctions.optionalProtection
      .listArticlesByTag(selectedTag)
      .then((data) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            activeMode: "tags",
            activeTag: selectedTag,
            postTag: data.articles,
          };
        });
      });
  };

  favArticleHandler = () => {};

  componentDidMount = () => {
    utilityFunctions.optionalProtection.listArticles().then((data) => {
      this.setState({ postsHome: data.articles });
    });
    utilityFunctions.optionalProtection.getTags().then((data) => {
      this.setState({ tags: data.tags });
    });
  };

  render() {
    if (this.state.postsHome === null || this.state.postsHome.length === 0) {
      return <LoaderScreen />;
    }
    // console.log({ data: this.state, handleSignIn: this.handleSignIn });
    return (
      <div className="App">
        <BrowserRouter>
          <DataProvider
            value={{
              data: this.state,
              handleSignIn: this.handleSignIn,
              handleSignUp: this.handleSignUp,
              handleSignOut: this.handleSignOut,
              activeTagHandler: this.activeTagHandler,
              favArticleHandler: this.favArticleHandler,
              activeModeChanger: this.handleActiveMode,
            }}
          >
            <Header />
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/signin" element={<SignIn />}></Route>
              <Route exact path="/signup" element={<SignUp />}></Route>
            </Routes>
          </DataProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
