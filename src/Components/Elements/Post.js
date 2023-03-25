import { Link } from "react-router-dom";
import helperFunction from "../HelperFunctions/HelperFunctions";
export default function Post(props) {
  console.log(props);
  return (
    <>
      <article className="article-item">
        <div className="post-info">
          <div className="post-author-details">
            <img
              className="article-profile-image"
              src={props.post.author.image}
              alt="profile"
            />
            <div className="name-container">
              <Link
                to={`/@${props.post.author.username}`}
                state={{ user: props.post.author }}
              >
                <span className="author-name">
                  {props.post.author.username}
                </span>
              </Link>
              <span className="article-date">{props.post.createdAt}</span>
            </div>
          </div>
          <div className="post-fav-container">
            {helperFunction.isSignedIn() ? (
              <>
                <span
                  className="favItem"
                  onClick={() => {
                    props.favArticleHandler(props.post.slug);
                  }}
                >
                  {props.post.favorited ? "❤️" : "🤍"}
                </span>
              </>
            ) : (
              <>
                <span className="favItem">
                  {props.post.favorited ? "❤️" : "🤍"}
                </span>
              </>
            )}

            <span className="favItem">{props.post.favoritesCount}</span>
          </div>
        </div>
        <div className="post-text">
          <Link to={`/article/${props.post.slug}`}>
            <h3 className="article-title">{props.post.title}</h3>
          </Link>
          <p className="article-description">{props.post.description}</p>
        </div>
        <div className="post-postscript">
          <span className="postscript-item">Read More...</span>
        </div>
      </article>
    </>
  );
}
