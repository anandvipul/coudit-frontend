import { Link } from "react-router-dom";
import helperFunction from "../Components/HelperFunctions/HelperFunctions";
import utilityFunctions from "../Components/HelperFunctions/HelperFunctionV0_2";
import { DataConsumer } from "../CustomContext/dataContext";

function Post1(props) {
  // console.log(props);
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
          <span className="tags-item">
            {props.post.tagList.map((item) => {
              return <> {item} </>;
            })}
          </span>
        </div>
      </article>
    </>
  );
}

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
  let dateCreated = new Date(props.post.createdAt);
  console.log(dateCreated.getDay());
  return (
    <DataConsumer>
      {(state) => {
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
                    <span className="author-name">
                      {props.post.author.username}
                    </span>
                  </Link>
                  <span className="article-date">{`${dateCreated.getDay()} ${
                    day[dateCreated.getDay()]
                  } ${
                    month[dateCreated.getMonth()]
                  }-${dateCreated.getFullYear()}`}</span>
                </div>
              </div>
              <div className="post-fav-container">
                {helperFunction.isSignedIn() ? (
                  <>
                    <span
                      className="favItem"
                      onClick={() => {
                        props.favArticleHandler(props.slug);
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
                <h3 className="article-title">{props.title}</h3>
              </Link>
              <p className="article-description">{props.post.description}</p>
            </div>
            <div className="post-postscript">
              <span className="postscript-item">Read More...</span>
              <span className="tags-item">
                {props.post.tagList.map((item) => {
                  return <> {item} </>;
                })}
              </span>
            </div>
          </article>
        );
      }}
    </DataConsumer>
  );
}

export default Post;