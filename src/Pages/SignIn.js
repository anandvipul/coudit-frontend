import Footer from "../components/Footer";
import React from "react";
import { Navigate } from "react-router-dom";
import utilityFunctions from "../services/HelperFunctionV0_2";
import { useUser } from "../hooks/useUser";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      success: false,
    };
  }

  handleChange = (elem) => {
    this.setState({
      [elem.target.name]: elem.target.value,
    });
  };

  handleSubmitObject = async (event) => {
    event.preventDefault();

    // this.props.onSubmit(this.state);
    await utilityFunctions.admin
      .authenticateUser(this.state)
      .then((data) => this.props.setUser(data));

    this.setState({ success: true });
  };

  render() {
    if (utilityFunctions.admin.isSignedIn()) {
      return <Navigate to="/" user={this.state.user} />;
    }
    return (
      <>
        <section className="center sign-in">
          <h1 style={{ marginBottom: 0, marginTop: "3rem" }}>Sign in</h1>
          <p style={{ marginBottom: "2rem" }}>need an account ?</p>
          <div className="form-container center">
            <form onSubmit={this.handleSubmitObject}>
              {/* <span>{this.props.errors}</span> */}
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
                Sign in
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
