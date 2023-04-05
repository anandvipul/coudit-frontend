import React from "react";
import { DataConsumer } from "../CustomContext/dataContext";
import Hero from "./Hero";
import Footer from "./Footer";
import Main from "./Main";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <DataConsumer>
          {(state) => {
            return (
              <>
                <Hero />
                <Main />
                <Footer />
              </>
            );
          }}
        </DataConsumer>
      </div>
    );
  }
}

export default Home;
