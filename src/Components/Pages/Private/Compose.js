import React from "react";
import PrivateHeader from "./PrivateHeader";
import helperFunction from "../../HelperFunctions/HelperFunctions";
import { Navigate } from "react-router-dom";

class Compose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tags: "",
      submitted: false,
    };
  }

  handleChange = (elem) => {
    this.setState({
      [elem.target.name]: elem.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    helperFunction.publishArticle(this.state).then((data) => {
      if (data !== undefined) {
        this.setState({ submitted: true });
      }
    });
  };

  render() {
    if (this.state.submitted === true) {
      this.setState({
        submitted: false,
      });
      return <Navigate to={"/"} />;
    }
    return (
      <>
        <PrivateHeader handleSignOut={this.props.handleSignOut} />
        <section className="center ">
          <div className="form-container center">
            <h1 style={{ textAlign: "center" }}>Compose An Article !</h1>
            <form onSubmit={this.handleSubmit}>
              <input
                required
                className="input-field"
                type="text"
                name="title"
                placeholder="Article Title"
                value={this.state.title}
                onChange={(event) => {
                  this.handleChange(event);
                }}
              />
              <input
                required
                className="input-field"
                type="text"
                name="description"
                placeholder="What's this article about?"
                value={this.state.description}
                onChange={(event) => {
                  this.handleChange(event);
                }}
              />
              <textarea
                required
                className="input-field"
                type="text"
                name="body"
                placeholder="Write Your Article"
                value={this.state.body}
                onChange={(event) => {
                  this.handleChange(event);
                }}
              ></textarea>
              <input
                required
                className="input-field"
                type="text"
                name="tags"
                placeholder="Enter tags"
                value={this.state.tags}
                onChange={(event) => {
                  this.handleChange(event);
                }}
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
