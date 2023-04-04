import React from "react";
import "./Components/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./CustomContext/dataContext";
import LoaderScreen from "./Components/LoaderScreen";
import utilityFunctions from "./Components/HelperFunctions/HelperFunctionV0_2";
import Home from "./AppComponents/Home";
import SignIn from "./AppComponents/SignIn";
import SignUp from "./AppComponents/SignUp";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsHome: [],
      tags: [],
      loggedInState: {
        state: false,
        error: "",
        user: {},
      },
    };
  }

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

  componentDidMount = () => {
    utilityFunctions.optionalProtection.listArticles().then((data) => {
      this.setState({ postsHome: data.articles });
    });
  };

  render() {
    if (this.state.postsHome === null || this.state.postsHome.length === 0) {
      return <LoaderScreen />;
    }
    console.log({ data: this.state, handleSignIn: this.handleSignIn });
    return (
      <div className="App">
        <BrowserRouter>
          <DataProvider
            value={{ data: this.state, handleSignIn: this.handleSignIn }}
          >
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              {/* <Route exact path="/signin" element={<SignIn />}></Route>
              <Route exact path="/signup" element={<SignUp />}></Route> */}
            </Routes>
          </DataProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
