import utilityFunctions from "../services/HelperFunctionV0_2";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function IndependentArticle(props) {
  let [article, seArticle] = useState({});
  let [fav, setFav] = useState(false);
  let [commentChange, setChangeComment] = useState(false);
  let [comment, setComment] = useState("");
  let [listComment, setListComment] = useState([]);

  let { slug } = useParams();

  useEffect(() => {
    utilityFunctions.optionalProtection.getArticle(slug).then((data) => {
      seArticle(data.article);
    });
  }, [fav]);

  useEffect(() => {
    utilityFunctions.optionalProtection.getComments(slug).then((data) => {
      setListComment(data.comments);
    });
  }, [commentChange]);

  let commentChangeHandler = (value) => {
    console.log(value);
    setComment(value);
  };

  return (
    <>
      <section className="article-intro center safe-side">
        <h1>
          {article.title}
          {utilityFunctions.admin.isSignedIn() ? (
            <span
              onClick={() => {
                utilityFunctions.accessProtected
                  .favArticleHandler(article.slug)
                  .then((data) => {
                    setFav(!fav);
                  });
              }}
            >
              {article.favorited ? "❤️" : "🤍"}
            </span>
          ) : (
            <></>
          )}
        </h1>
        <h4>{article.description}</h4>
        <p className="independent-article-body">
          {article.body &&
            article.body.split("\\n").map((segment) => {
              return segment;
            })}
        </p>
      </section>
      <section className="comment-container center safe-side">
        <div className="add-comment">
          <textarea
            rows={5}
            onChange={(event) => {
              commentChangeHandler(event.target.value);
            }}
            value={comment}
          ></textarea>
          <button
            className="btn comment-post-btn"
            type="button"
            onClick={() => {
              utilityFunctions.accessProtected
                .addComment(article.slug, comment)
                .then((data) => {
                  setChangeComment(!commentChange);
                });
            }}
          >
            Post
          </button>
        </div>
        <div className="prev-comment">
          {listComment.length ? (
            <>
              {listComment.map((item) => {
                return (
                  <div className="comment-item">
                    <p>{item.body}</p>
                    <span>
                      by, <i>{item.author.username}</i>
                    </span>
                  </div>
                );
              })}
            </>
          ) : (
            <>No Comment</>
          )}
        </div>
      </section>
    </>
  );
}
