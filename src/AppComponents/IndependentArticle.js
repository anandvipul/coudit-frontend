import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import utilityFunctions from "../Components/HelperFunctions/HelperFunctionV0_2";

export default function IndependentArticle(props) {
  let [article, seArticle] = useState({});
  let [fav, setFav] = useState(false);

  let { slug } = useParams();

  useEffect(() => {
    utilityFunctions.optionalProtection.getArticle(slug).then((data) => {
      seArticle(data.article);
    });
  }, [fav]);

  return (
    <>
      <section className="article-intro center">
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
        <p>{article.body}</p>
      </section>
      <section className="comment-container">
        <div className="prev-comment"></div>
        <div className="add-comment"></div>
      </section>
    </>
  );
}
