import React from "react";
import PrivateHeader from "./PrivateHeader";

import { Navigate } from "react-router-dom";
import helperFunction from "../../HelperFunctions/HelperFunctions";

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

    helperFunction.updateProfile(this.state).then((data) => {
      this.props.handleSignOut(event);
    });
  };

  componentDidMount = () => {
    this.setState({
      image: this.props.user.image,
      bio: this.props.user.bio,
      email: this.props.user.email,
      username: this.props.user.username,
      password: this.props.user.password,
    });
  };

  render() {
    if (this.state.isSubmitted) {
      //   this.setState((prevState) => {
      //     return { isSubmitted: false };
      //   });

      return <Navigate to="/" replace />;
    } else {
      return (
        <>
          <PrivateHeader handleSignOut={this.props.handleSignOut} />
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
