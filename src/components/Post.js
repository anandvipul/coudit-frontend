import { Link } from "react-router-dom";
import utilityFunctions from "../services/HelperFunctionV0_2";

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function Post(props) {
  // console.log(props);
  let dateCreated = new Date(props.post.createdAt);

  return (
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
              state={{ user: props.author }}
            >
              <span className="author-name">{props.post.author.username}</span>
            </Link>
            <span className="article-date">{` ${
              day[dateCreated.getDay()]
            } ${dateCreated.getDay()} ${
              month[dateCreated.getMonth()]
            }-${dateCreated.getFullYear()}`}</span>
          </div>
        </div>
        <div className="post-fav-container pointer">
          {utilityFunctions.admin.isSignedIn() ? (
            <>
              <span
                className="favItem"
                onClick={async () => {
                  // props.favArticleHandler();
                  await utilityFunctions.accessProtected
                    .favArticleHandler(props.post.slug)
                    .then();
                  props.setTriger(!props.triger);
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
        <div className="seperate">
          <Link to={`/article/${props.post.slug}`}>
            <h3 className="article-title">{props.post.title}</h3>
          </Link>
          <h3
            onClick={async () => {
              await utilityFunctions.accessProtected
                .deleteArticle(props.post.slug)
                .then();
              props.setTriger(!props.triger);
            }}
          >
            {utilityFunctions.admin.isSignedIn() ? (
              utilityFunctions.accessProtected.currentUserLocal().user
                .username === props.post.author.username ? (
                "❌"
              ) : (
                ""
              )
            ) : (
              <></>
            )}
            {/* {utilityFunctions.admin.isSignedIn() ? "❌" : ""} */}
          </h3>
        </div>

        <p className="article-description">{props.post.description}</p>
      </div>
      <div className="post-postscript">
        <span className="postscript-item">
          <Link to={`/article/${props.post.slug}`}>Read More...</Link>
        </span>
        <span className="tags-item">
          {props.post.tagList.map((item) => {
            return <> {item} </>;
          })}
        </span>
      </div>
    </article>
  );
}

export default Post;
