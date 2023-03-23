export default function Post(props) {
  return (
    <>
      <article className="article-item">
        <div className="post-info">
          <img
            className="article-profile-image"
            src={props.post.author.image}
            alt="profile"
          />
          <div className="name-container">
            <span className="author-name">{props.post.author.username}</span>
            <span className="article-date">{props.post.createdAt}</span>
          </div>
        </div>
        <div className="post-text">
          <h3 className="article-title">{props.post.title}</h3>
          <p className="article-description">{props.post.description}</p>
        </div>
        <div className="post-postscript">
          <span className="postscript-item">Read More...</span>
        </div>
      </article>
    </>
  );
}
