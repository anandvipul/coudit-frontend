import { NavLink } from "react-router-dom";
import React from "react";
import helperFunction from "../../HelperFunctions/HelperFunctions";
import Main from "../../Elements/Main";

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
        <header className="center">
          <nav className="safe-side">
            <div className="logo">coudit</div>
            <ul className="nav-links">
              <li className="link">
                <NavLink replace to="/">
                  Home
                </NavLink>
              </li>
              <li className="link">
                <NavLink to="/compose">New Post</NavLink>
              </li>
              <li className="link">
                <NavLink to="/settings">Settings</NavLink>
              </li>
              <li className="link">
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li className="link">
                <form onSubmit={this.props.handleSignOut}>
                  <button type="submit" className="link-btn">
                    Sign Out
                  </button>
                </form>
              </li>
            </ul>
          </nav>
        </header>
        <Main
          tags={this.state.tags}
          activeMode={this.state.activeMode}
          activeTagHandler={this.activeTagChanger}
          activeModeChanger={this.modeChanger}
          posts={this.state.posts}
        />
      </>
    );
  }
}

export default HomePrivate;
