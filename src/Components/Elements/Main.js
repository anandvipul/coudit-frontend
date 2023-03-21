import Aside from "./Aside";
import Post from "./Post";
import React from "react";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modeSelected: "global",
      posts: [] || this.props.posts,
    };
  }

  render() {
    return (
      <>
        <main className="center">
          <section className="post-section-container">
            <div className="feed-title">
              <h4
                className={`${
                  this.state.modeSelected === "global" ? "active" : ""
                }`}
              >
                Global Feed
              </h4>
              <h4
                className={`${
                  this.state.modeSelected === "tags" ? "active" : ""
                }`}
              >
                #tag-item
              </h4>
            </div>
            <div className="post-container">
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
            </div>
          </section>
          <Aside />
        </main>
      </>
    );
  }
}

export default Main;
