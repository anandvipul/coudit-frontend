import React from "react";

import Header from "../Elements/Header";
import Hero from "../Elements/Hero";
import Main from "../Elements/Main";
import Footer from "../Elements/Footer";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Hero />
        <Main />
        <Footer />
      </>
    );
  }
}

export default Home;
