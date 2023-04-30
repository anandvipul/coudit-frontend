import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Root_0_3";
import Post from "../components/Post";
import { useParams } from "react-router-dom";
import utilityFunctions from "../services/HelperFunctionV0_2";
import LoaderScreen from "./LoaderScreen";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("self");
  const [triger, setTriger] = useState(false);
  const [profile, setProfile] = useState({});

  let { user } = useContext(UserContext);
  let { username } = useParams();
  if (username === undefined) {
    username = user.username;
  } else {
    username = username.substring(1);
  }

  useEffect(() => {
    if (activeTab === "self") {
      utilityFunctions.optionalProtection
        .listArticlesByAuthor(username)
        .then((data) => {
          setPosts(data.articles);
        });
    } else if (activeTab === "fav") {
      utilityFunctions.optionalProtection
        .listArticlesByFav(username)
        .then((data) => {
          setPosts(data.articles);
        });
    }
  }, [activeTab, username]);

  useEffect(() => {
    utilityFunctions.optionalProtection.getProfile(username).then((data) => {
      setProfile(data.profile);
    });
  }, [username, triger]);

  return (
    <>
      <main>
        <section className="profile-header hero">
          <img
            className="profile-pic"
            src={`${profile.image ? profile.image : ""}`}
            alt="profile-pic"
          />

          <h3 className="">{profile.username ? profile.username : ""}</h3>
          {utilityFunctions.admin.isSignedIn() ? (
            <span
              className="pointer"
              onClick={(event) => {
                event.preventDefault();
                utilityFunctions.accessProtected
                  .followUserHandler(username)
                  .then(setTriger(!triger));
              }}
            >
              {profile.following ? "✅" : "☑️"}
            </span>
          ) : (
            <></>
          )}
          <p className="blog-punch">{profile.bio ? profile.bio : ""}</p>
        </section>
        <section className="profile-article-container center">
          <div className="feed-title">
            <h4
              className={`${activeTab === "self" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("self");
              }}
            >
              Your Articles
            </h4>
            <h4
              className={`${activeTab === "fav" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("fav");
              }}
            >
              Your Favourites
            </h4>
          </div>
          <div className="post-container">
            {posts.length ? (
              posts.map((item, index) => {
                return (
                  <>
                    <Post
                      key={index}
                      post={item}
                      triger={triger}
                      setTriger={setTriger}
                    />
                  </>
                );
              })
            ) : (
              <LoaderScreen />
            )}
            {/* {posts.map((item, index) => {
              return (
                <>
                  <Post
                    key={index}
                    post={item}
                    triger={triger}
                    setTriger={setTriger}
                  />
                </>
              );
            })} */}
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
