import Header from "../Elements/Header";
import Footer from "../Elements/Footer";

export default function Article(props) {
  return (
    <>
      <Header />
      <article className="full-individul-article center">
        <h2>
          If we quantify the alarm, we can get to the FTP pixel through the
          online SSL interface!
        </h2>
        <div className="post-info">
          <img
            className="article-profile-image"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            alt="profile"
          />
          <div className="name-container">
            <span className="author-name">Seagull Ferdandwis</span>
            <span className="article-date">Mon Jan 01 3012</span>
          </div>
        </div>
        <p className="article-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <div className="article-tag-container">
          <div className="tag-items-container">
            <p className="tag-item">dream</p>
            <p className="tag-item">debt</p>
            <p className="tag-item">rescue</p>
            <p className="tag-item">platoon</p>
            <p className="tag-item">plateau</p>
            <p className="tag-item">trim</p>
            <p className="tag-item">flex</p>
            <p className="tag-item">grid</p>
            <p className="tag-item">block</p>
            <p className="tag-item">brick</p>
          </div>
        </div>
        <hr />

        <div className="comments">SignIn / Up To Comment</div>
      </article>
      <div className="footer-container">
        <Footer />
      </div>
    </>
  );
}
