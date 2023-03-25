import { NavLink } from "react-router-dom";
import React from "react";
import helperFunction from "../../HelperFunctions/HelperFunctions";
import Main from "../../Elements/Main";
import PrivateHeader from "./PrivateHeader";

class HomePrivate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      tags: [],
      activeMode: "global",
      activeTag: "",
      user: {} || this.props.user,
    };
  }

  async componentDidMount() {
    helperFunction.fetchTags().then((data) => {
      this.setState(
        (prevState) => {
          return { tags: data.tags };
        },
        () => {
          // console.log(this.state);
        }
      );
    });

    helperFunction.feedArticles().then((data) => {
      this.setState(
        (prevState) => {
          return { posts: data.articles };
        },
        () => {
          // console.log(this.state);
        }
      );
    });
  }

  modeChanger = async (mode) => {
    // console.log(mode);

    if (mode === "global") {
      helperFunction.fetchArticles().then((data) => {
        this.setState(
          (prevState) => {
            return { posts: data.articles, activeMode: mode };
          },
          () => {
            // console.log(this.state);
          }
        );
      });
    }
  };

  activeTagChanger = async (tag) => {
    let selectedTag = tag.target.innerText;

    helperFunction.fetchArticlesTag(selectedTag).then((data) => {
      this.setState(
        (prevState) => {
          return {
            posts: data.articles,
            activeMode: "tags",
            activeTag: `${selectedTag}`,
          };
        },
        () => {
          // console.log(this.state);
        }
      );
    });
  };

  shouldComponentUpdate = () => {
    return true;
  };

  favArticle = async (slug) => {
    helperFunction.favArticle(slug).then((data) => {
      this.componentDidMount();
    });
  };

  render() {
    return (
      <>
        <PrivateHeader handleSignOut={this.props.handleSignOut} />
        <Main
          tags={this.state.tags}
          activeMode={this.state.activeMode}
          activeTagHandler={this.activeTagChanger}
          activeModeChanger={this.modeChanger}
          posts={this.state.posts}
          activeTag={this.state.activeTag}
          favArticleHandler={this.favArticle}
        />
      </>
    );
  }
}

export default HomePrivate;
