import React from "react";
import { DataConsumer } from "../CustomContext/dataContext";
import Header from "./Header";

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
            return <Header />;
          }}
        </DataConsumer>
      </div>
    );
  }
}

export default Home;
