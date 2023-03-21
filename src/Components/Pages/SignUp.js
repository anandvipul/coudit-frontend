import Footer from "../Elements/Footer";
import React from "react";

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
    return (
      <>
        <section className="center sign-in">
          <h1 style={{ marginBottom: 0, marginTop: "3rem" }}>Sign Up</h1>
          <p style={{ marginBottom: "2rem" }}>Have an Account ?</p>
          <div className="signin-container center">
            <form onSubmit={this.handleSubmitObject}>
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
              <button type="submit" className="signup-btn">
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
