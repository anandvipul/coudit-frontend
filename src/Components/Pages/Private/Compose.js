import React from "react";
import PrivateHeader from "./PrivateHeader";

class Compose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <PrivateHeader handleSignOut={this.props.handleSignOut} />
        <section className="center ">
          <div className="form-container center">
            <h1 style={{ textAlign: "center" }}>Compose An Article !</h1>
            <form>
              <input
                className="input-field"
                type="text"
                name="form-article-title"
                placeholder="Article Title"
              />
              <input
                className="input-field"
                type="text"
                name="form-article-description"
                placeholder="What's this article about?"
              />
              <textarea
                className="input-field"
                type="text"
                name="form-article-body"
                placeholder="Write Your Article"
              ></textarea>
              <input
                className="input-field"
                type="text"
                name="form-article-tags"
                placeholder="Enter tags"
              />
              <button type="submit" className="btn">
                Publish Article
              </button>
            </form>
          </div>
        </section>
      </>
    );
  }
}

export default Compose;
