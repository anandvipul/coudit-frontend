export default function Post(props) {
  return (
    <>
      <article className="article-item">
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
        <div className="post-text">
          <h3 className="article-title">
            From its medieval origins to the digital era
          </h3>
          <p className="article-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="post-postscript">
          <span className="postscript-item">Read More...</span>
        </div>
      </article>
    </>
  );
}
