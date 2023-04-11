import utilityFunctions from "../Components/HelperFunctions/HelperFunctionV0_2";
import { Navigate } from "react-router-dom";

import React from "react";

class SignOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: "" };
  }

  static getDerivedStateFromProps = (props, state) => {
    return { loggedIn: utilityFunctions.admin.isSignedIn() };
  };

  componentDidMount = () => {
    this.props.handleSignOut().then(() => {
      this.setState({ loggedIn: false });
    });
  };

  render() {
    console.log(this.state);
    return (
      <>
        {this.state.loggedIn ? (
          <>Logged In</>
        ) : (
          <>
            <Navigate to={"/"} />
          </>
        )}
      </>
    );
  }
}

export default SignOut;
