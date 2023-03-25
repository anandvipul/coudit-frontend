import { useLocation } from "react-router-dom";
import Header from "../Elements/Header";
import PrivateHeader from "./Private/PrivateHeader";
import helperFunction from "../HelperFunctions/HelperFunctions";
import { useState, useEffect } from "react";
import Post from "../Elements/Post";

export default function UserProfile(props) {
  let [activeState, changeActiveState] = useState("myArticles");
  let [posts, setPosts] = useState([]);

  let { state } = useLocation();
  let [info, setInfo] = useState({ ...state.user });

  function switchFav(value) {
    changeActiveState(value);
  }

  function followerToggle(data) {
    setInfo({ ...data });
  }

  useEffect(() => {
    console.log("Info", info.username);
    state !== undefined
      ? activeState === "myArticles"
        ? helperFunction.isSignedIn()
          ? helperFunction.fetchUserArticle(info.username).then((data) => {
              setPosts(data.articles);
            })
          : helperFunction.fetchMyArticlesNSI(info.username).then((data) => {
              setPosts(data.articles);
            })
        : helperFunction.isSignedIn()
        ? helperFunction.fetchFavArticle(info.username).then((data) => {
            setPosts(data.articles);
          })
        : helperFunction.fetchMyFavArticlesNSI(info.username).then((data) => {
            setPosts(data.articles);
          })
      : setPosts({ posts: [] });
  }, [activeState]);

  //   console.log(state.user);
  //   Logic
  if (state === undefined) {
    return <>Sign In Again</>;
  } else {
    let data = info.user;
    return (
      <>
        {helperFunction.isSignedIn() ? (
          <PrivateHeader handleSignOut={props.handleSignOut} />
        ) : (
          <Header />
        )}
        <main>
          <section className="profile-header hero">
            <img
              className="profile-pic"
              src={`${info.image}`}
              alt="profile-pic"
            />
            <h1>{info.username}</h1>
            <h5
              onClick={(event) => {
                if (event.target.innerText === "Following") {
                  //   console.log("Was Following turning into follow");
                  helperFunction.unFollowuser(info.username).then((data) => {
                    followerToggle(data.profile);
                  });
                } else {
                  //   console.log("Was Follo turing into following");
                  helperFunction.followUser(info.username).then((data) => {
                    followerToggle(data.profile);
                  });
                }
              }}
            >
              {info.following ? "Following" : "Follow"}
            </h5>
          </section>
          <section className="profile-article-container center">
            <div className="feed-title">
              <h4
                className={`${activeState === "myArticles" ? "active" : ""}`}
                onClick={() => {
                  switchFav("myArticles");
                }}
              >
                My Articles
              </h4>
              <h4
                className={`${activeState === "myFavourites" ? "active" : ""}`}
                onClick={() => {
                  switchFav("myFavourites");
                }}
              >
                My Favourites
              </h4>
            </div>
            <div className="post-container">
              {posts.map((item, index) => {
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
