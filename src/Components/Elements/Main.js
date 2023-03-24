import Aside from "./Aside";
import Post from "./Post";
import React from "react";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [] || this.props.posts,
    };
  }
  componentDidMount() {
    console.log("Mounted", this.props);
  }

  componentDidUpdate() {
    console.log("Updated", this.props);
  }

  render() {
    return (
      <>
        <main className="center main-section-col">
          <section className="post-section-container">
            <div className="feed-title">
              <h4
                className={`${
                  this.props.activeMode === "global" ? "active" : ""
                }`}
                onClick={() => {
                  this.props.activeModeChanger("global");
                }}
              >
                Global Feed
              </h4>
              <h4
                className={`${
                  this.props.activeMode === "tags" ? "active" : ""
                }`}
                onClick={() => {
                  this.props.activeModeChanger("tags");
                }}
              >
                {this.props.activeTag ? `#${this.props.activeTag}` : ""}
              </h4>
            </div>
            <div className="post-container">
              {this.props.posts.map((item, index) => {
                return (
                  <>
                    <Post key={index} post={item} />
                  </>
                );
              })}
            </div>
          </section>
          <Aside
            tags={this.props.tags}
            activeTagHandler={this.props.activeTagHandler}
          />
        </main>
      </>
    );
  }
}

export default Main;
