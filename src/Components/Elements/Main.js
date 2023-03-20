import Aside from "./Aside";
import Post from "./Post";

export default function Main(props) {
  return (
    <>
      <main className="center">
        <section className="post-section-container">
          <div className="feed-title">
            <h4>Global Feed</h4>
            <h4 className="selected-title">#tag-item</h4>
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
