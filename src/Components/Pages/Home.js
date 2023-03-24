import React from "react";

import helperFunction from "../HelperFunctions/HelperFunctions";
import Hero from "../Elements/Hero";
import Main from "../Elements/Main";
import Footer from "../Elements/Footer";
import Header from "../Elements/Header";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      tags: [],
      activeMode: "global",
      activeTag: "",
    };
  }

  async componentDidMount() {
    helperFunction.fetchTags().then((data) => {
      this.setState(
        (prevState) => {
          return { tags: data.tags };
        },
        () => {
          console.log(this.state);
        }
      );
    });

    helperFunction.fetchArticles().then((data) => {
      this.setState(
        (prevState) => {
          return { posts: data.articles };
        },
        () => {
          console.log(this.state);
        }
      );
    });
  }

  modeChanger = async (mode) => {
    console.log(mode);

    if (mode === "global") {
      helperFunction.fetchArticles().then((data) => {
        this.setState(
          (prevState) => {
            return { posts: data.articles, activeMode: mode };
          },
          () => {
            console.log(this.state);
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
          console.log(this.state);
        }
      );
    });
  };

  render() {
    return (
      <>
        <Header />
        <Hero />
        <Main
          tags={this.state.tags}
          activeMode={this.state.activeMode}
          activeTagHandler={this.activeTagChanger}
          activeModeChanger={this.modeChanger}
          posts={this.state.posts}
          activeTag={this.state.activeTag}
        />
        <Footer />
      </>
    );
  }
}

export default Home;
