import Footer from "../Elements/Footer";
import React from "react";
import Header from "../Elements/Header";
import { Navigate } from "react-router-dom";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  handleChange = (elem) => {
    this.setState({
      [elem.target.name]: elem.target.value,
    });
  };

  handleSubmitObject = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state);
  };

  render() {
    if (this.props.isSignedIn()) {
      return <Navigate to="/" user={this.state.user} />;
    }
    return (
      <>
        <Header />
        <section className="center sign-in">
          <h1 style={{ marginBottom: 0, marginTop: "3rem" }}>Sign Up</h1>
          <p style={{ marginBottom: "2rem" }}>Have an Account ?</p>
          <div className="form-container center">
            <form onSubmit={this.handleSubmitObject}>
              <span>{this.props.errors}</span>
              <input
                className="input-field"
                type="text"
                name="username"
                placeholder="Name"
                value={this.state.name}
                onChange={(event) => {
                  this.handleChange(event);
                }}
              />
              <input
                className="input-field"
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={(event) => {
                  this.handleChange(event);
                }}
              />
              <input
                className="input-field"
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(event) => {
                  this.handleChange(event);
                }}
              />
              <button type="submit" className="btn">
                Sign Up
              </button>
            </form>
          </div>
        </section>
        <div className="footer-container">
          <Footer />
        </div>
      </>
    );
  }
}

export default SignIn;
