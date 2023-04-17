import utilityFunctions from "../services/HelperFunctionV0_2";
import { Navigate } from "react-router-dom";

import React from "react";

class SignOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: true };
  }

  componentDidMount = () => {
    utilityFunctions.admin.signOutUser().then(() => {
      this.props.setUser({});
      this.setState({ loggedIn: false });
    });
  };

  render() {
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
