import React from "react";
import "./style.css";
import Home from "./Pages/Home";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Home />
      </>
    );
  }
}

export default Container;
