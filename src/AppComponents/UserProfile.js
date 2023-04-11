import { DataConsumer } from "../CustomContext/dataContext";
import Post from "./Post";
import { Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import utilityFunctions from "../Components/HelperFunctions/HelperFunctionV0_2";
import helperFunction from "../Components/HelperFunctions/HelperFunctions";

function UserProfile() {
  let { username } = useParams();
  username = username.substring(1);
  console.log(username);
  let [yourArticles, setYourArticle] = useState([]);
  let [yourFavourites, setYourFavourites] = useState([]);
  let [activeMode, setMode] = useState("authored");
  let [profileData, modifyProfile] = useState({});

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    utilityFunctions.optionalProtection
      .listArticlesByAuthor(username)
      .then((data) => data.articles)
      .then((data) => setYourArticle(data));
    utilityFunctions.optionalProtection
      .listArticlesByFav(username)
      .then((data) => data.articles)
      .then((data) => setYourFavourites(data));
    utilityFunctions.optionalProtection
      .getProfile(username)
      .then((data) => data.profile)
      .then((data) => modifyProfile(data));
  }

  if (!profileData) {
    return <>Loading...</>;
  } else {
    console.log(profileData);
    return (
      <DataConsumer>
        {(state) => {
          const renderPost =
            activeMode === "authored" ? yourArticles : yourFavourites;
          console.log(profileData);

          return (
            <>
              <section className="hero safe-side">
                <img
                  className="profile-pic"
                  src={`${profileData.image}`}
                  alt="profile-pic"
                />
                <h3 className="">{profileData.username}</h3>
                {utilityFunctions.admin.isSignedIn() ? (
                  <span
                    className="pointer"
                    onClick={(event) => {
                      event.preventDefault();
                      utilityFunctions.accessProtected
                        .followUserHandler(username)
                        .then((data) => modifyProfile(data.profile));
                    }}
                  >
                    {profileData.following ? "✅" : "☑️"}
                  </span>
                ) : (
                  <></>
                )}
                <p className="blog-punch">{profileData.bio}</p>
              </section>
              <main className="center">
                <section className="post-section-container">
                  <div className="feed-title">
                    <h4
                      className={`${activeMode === "authored" ? "active" : ""}`}
                      onClick={() => {
                        setMode("authored");
                      }}
                    >
                      Your Articles
                    </h4>
                    <h4
                      className={`${activeMode === "fav" ? "active" : ""}`}
                      onClick={() => {
                        setMode("fav");
                      }}
                    >
                      Your Favourites
                    </h4>
                  </div>
                  <div className="post-container">
                    {renderPost.map((item, index) => {
                      return (
                        <>
                          <Post
                            key={index}
                            post={item}
                            favArticleHandler={state.favArticleHandler}
                          />
                        </>
                      );
                    })}
                  </div>
                </section>
              </main>
            </>
          );
        }}
      </DataConsumer>
    );
  }
}

export default UserProfile;
