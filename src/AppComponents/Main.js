import { DataConsumer } from "../CustomContext/dataContext";
import Aside from "./Aside";
import Post from "./Post";
import React from "react";

class Main1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [] || this.props.posts,
    };
  }
  componentDidMount() {
    // console.log("Mounted", this.props);
  }

  componentDidUpdate() {
    // console.log("Updated", this.props);
  }

  render() {
    return (
      <DataConsumer>
        {(state) => {
          return (
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
                      <Post
                        key={index}
                        post={item}
                        favArticleHandler={this.props.favArticleHandler}
                      />
                    );
                  })}
                </div>
              </section>
              <Aside
                tags={this.props.tags}
                activeTagHandler={this.props.activeTagHandler}
              />
            </main>
          );
        }}
      </DataConsumer>
    );
  }
}

function Main() {
  return (
    <DataConsumer>
      {(state) => {
        const renderPost =
          state.data.activeMode === "tags"
            ? state.data.postTag
            : state.data.postsHome;
        return (
          <main className="center main-section-col">
            <section className="post-section-container">
              <div className="feed-title">
                <h4
                  className={`${
                    state.data.activeMode === "global" ? "active" : ""
                  }`}
                  onClick={() => {
                    state.activeModeChanger("global");
                  }}
                >
                  Global Feed
                </h4>
                <h4
                  className={`${
                    state.data.activeMode === "tags" ? "active" : ""
                  }`}
                  onClick={() => {
                    state.activeModeChanger("tags");
                  }}
                >
                  {state.data.activeTag ? `#${state.data.activeTag}` : ""}
                </h4>
              </div>
              <div className="post-container">
                {renderPost.map((item, index) => {
                  return (
                    <>
                      <Post
                        key={index}
                        post={item}
                        favArticleHandler={state.favArticleHandler}
                      />
                    </>
                  );
                })}
              </div>
            </section>
            <Aside
              tags={state.data.tags}
              activeTagHandler={state.activeTagHandler}
            />
          </main>
        );
      }}
    </DataConsumer>
  );
}

export default Main;
