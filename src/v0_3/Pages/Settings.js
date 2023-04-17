import React from "react";

import { Navigate } from "react-router-dom";
import utilityFunctions from "../services/HelperFunctionV0_2";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      username: "",
      bio: "",
      email: "",
      password: "",
      isSubmitted: false,
    };
  }

  onSubmit = (event) => {
    event.preventDefault();

    utilityFunctions.accessProtected.updateUser(this.state).then((data) => {
      this.setState({ isSubmitted: true });
    });
  };

  componentDidMount = () => {
    utilityFunctions.accessProtected.currentUser().then((data) => {
      console.log(data);
      let user = data.user;
      this.setState({
        username: user.username,
        email: user.email,
        bio: user.bio,
        image: user.image,
      });
    });
  };

  render() {
    if (this.state.isSubmitted) {
      //   this.setState((prevState) => {
      //     return { isSubmitted: false };
      //   });

      return <Navigate to="/signout" replace />;
    } else {
      return (
        <>
          <section className="center">
            <div className="form-container center">
              <h1 style={{ textAlign: "center" }}>Your Settings</h1>
              <form onSubmit={this.onSubmit}>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Image Link"
                  name="image"
                  value={this.state.image}
                  onChange={(event) => {
                    this.setState({
                      [event.target.name]: event.target.value,
                    });
                  }}
                />
                <input
                  className="input-field"
                  type="text"
                  placeholder="User Name"
                  name="username"
                  value={this.state.username}
                  onChange={(event) => {
                    this.setState({
                      [event.target.name]: event.target.value,
                    });
                  }}
                />
                <textarea
                  className="input-field"
                  type="text"
                  placeholder="bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={(event) => {
                    this.setState({
                      [event.target.name]: event.target.value,
                    });
                  }}
                ></textarea>
                <input
                  className="input-field"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={(event) => {
                    this.setState({
                      [event.target.name]: event.target.value,
                    });
                  }}
                />
                <input
                  className="input-field"
                  type="password"
                  placeholder="New Password"
                  name="password"
                  value={this.state.password}
                  onChange={(event) => {
                    this.setState({
                      [event.target.name]: event.target.value,
                    });
                  }}
                />
                <button type="submit" className="btn">
                  Update Settings
                </button>
              </form>
            </div>
          </section>
        </>
      );
    }
  }
}

export default Settings;
