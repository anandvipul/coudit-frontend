import React from "react";
import PrivateHeader from "./PrivateHeader";
import Post from "../../Elements/Post";
import helperFunction from "../../HelperFunctions/HelperFunctions";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "",
      post: [],

      user: props.user || JSON.parse(localStorage.getItem("user")).user,
    };
  }

  switchFav = (value) => {
    if (value === "yourFavourites") {
      helperFunction
        .fetchFavArticle(this.props.user.username, this.props.user.token)
        .then((data) => {
          this.setState({ post: data.articles });
        });
    }
    if (value === "yourarticles") {
      helperFunction
        .fetchUserArticle(this.props.user.username, this.props.user.token)
        .then((data) => {
          this.setState({ post: data.articles });
        });
    }
    this.setState({
      activeTab: value,
    });
  };

  componentDidMount = async () => {
    console.log(this.props);
    helperFunction
      .fetchUserArticle(this.props.user.username, this.props.user.token)
      .then((data) => {
        this.setState({ post: data.articles });
      });
  };

  render() {
    // console.log(this.props);
    return (
      <>
        <PrivateHeader handleSignOut={this.props.handleSignOut} />
        <main>
          <section className="profile-header hero">
            <img
              className="profile-pic"
              src={`${this.props.user.image}`}
              alt="profile-pic"
            />
            <h1>{this.props.user.username}</h1>
          </section>
          <section className="profile-article-container center">
            <div className="feed-title">
              <h4
                className={`${
                  this.state.activeTab === "yourarticles" ? "active" : ""
                }`}
                onClick={() => {
                  this.switchFav("yourarticles");
                }}
              >
                Your Articles
              </h4>
              <h4
                className={`${
                  this.state.activeTab === "yourFavourites" ? "active" : ""
                }`}
                onClick={() => {
                  this.switchFav("yourFavourites");
                }}
              >
                Your Favourites
              </h4>
            </div>
            <div className="post-container">
              {this.state.post.map((item, index) => {
                return (
                  <>
                    <Post key={index} post={item} />
                  </>
                );
              })}
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default Profile;
