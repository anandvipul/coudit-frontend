import LoaderScreen from "../Pages/LoaderScreen";
import Aside from "./Aside";
import Post from "./Post";
import React from "react";

function Main({
  activeMode,
  activeModeChanger,
  activeTag,
  activeTagHandler,
  renderPost,
  renderTags,
  triger,
  setTriger,
}) {
  return (
    <main className="center main-section-col">
      <section className="post-section-container">
        <div className="feed-title">
          <h4
            className={`${activeMode === "global" ? "active" : ""}`}
            onClick={() => {
              activeModeChanger("global");
            }}
          >
            Global Feed
          </h4>
          <h4
            className={`${activeMode === "tags" ? "active" : ""}`}
            onClick={() => {
              activeModeChanger("tags");
            }}
          >
            {activeTag ? `#${activeTag}` : ""}
          </h4>
        </div>
        <div className="post-container">
          {renderPost.length ? (
            renderPost.map((item, index) => {
              return (
                <Post
                  key={index}
                  post={item}
                  triger={triger}
                  setTriger={setTriger}
                  // favArticleHandler={favArticleHandler}
                />
              );
            })
          ) : (
            <LoaderScreen />
          )}
        </div>
      </section>
      <Aside
        tags={renderTags}
        activeTagHandler={activeTagHandler}
        activeModeChanger={activeModeChanger}
      />
    </main>
  );
}

export default Main;
