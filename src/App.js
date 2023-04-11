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
import UserProfile from "./AppComponents/UserProfile";
import SignOut from "./AppComponents/SignOut";
import Compose from "./AppComponents/Compose";
import Settings from "./AppComponents/Settings";
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
    console.log(body);
    utilityFunctions.admin.authenticateUser(body).then(async (data) => {
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
        this.setState(
          (prevState) => {
            return { ...prevState, loggedInState: { ...loggedinData } };
          },
          () => {
            this.refresh();
          }
        );
      }
    });
  };

  handleSignUp = (body) => {
    // console.log(body);
    let loggedinData = this.state.loggedInState;
    utilityFunctions.admin.registerUser(body).then(async (data) => {
      if (data.errors) {
        // console.log(data);
        loggedinData.error =
          "email " +
          data.errors["email"] +
          " username" +
          data.errors["username"];
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
    utilityFunctions.admin.signOutUser().then(() =>
      this.setState(
        (prevState) => {
          return { loggedInState: { state: false, user: {} } };
        },
        () => {
          this.refresh();
        }
      )
    );
  };

  handleSignOut1 = async () => {
    utilityFunctions.admin.signOutUser().then(() =>
      this.setState(
        (prevState) => {
          return { loggedInState: { state: false, user: {} } };
        },
        () => {
          this.refresh();
        }
      )
    );
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

  favArticleHandler = (slug) => {
    console.log(slug);
    utilityFunctions.accessProtected.favArticleHandler(slug).then((data) => {
      this.refresh();
    });
  };

  componentDidMount = () => {
    utilityFunctions.optionalProtection.listArticles().then((data) => {
      this.setState({ postsHome: data.articles });
    });
    utilityFunctions.optionalProtection.getTags().then((data) => {
      this.setState({ tags: data.tags });
    });
  };

  refresh = async () => {
    utilityFunctions.optionalProtection.listArticles().then((data) => {
      this.setState({ postsHome: data.articles });
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
              <Route
                exact
                path="/signin"
                element={<SignIn onSubmit={this.handleSignIn} />}
              ></Route>
              <Route
                exact
                path="/signup"
                element={
                  <SignUp
                    onSubmit={this.handleSignUp}
                    errors={this.state.loggedInState.error}
                  />
                }
              ></Route>
              <Route
                exact
                path={"/:username"}
                element={<UserProfile />}
              ></Route>

              <Route
                exact
                path={"/signout"}
                element={<SignOut handleSignOut={this.handleSignOut1} />}
              ></Route>
              <Route exact path={"/compose"} element={<Compose />}></Route>
              <Route
                exact
                path={"/settings"}
                element={
                  <Settings
                    handleSignOut={this.handleSignOut}
                    user={this.state.loggedInState.user}
                  />
                }
              ></Route>
            </Routes>
          </DataProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
