import Header from "../Elements/Header";
import PrivateHeader from "./Private/PrivateHeader";
import helperFunction from "../HelperFunctions/HelperFunctions";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function IndependentArticle(props) {
  let [article, seArticle] = useState({});
  let [fav, setFav] = useState(false);

  let { slug } = useParams();

  useEffect(() => {
    helperFunction.fetchArticle(slug).then((data) => {
      seArticle(data.article);
    });
  }, [fav]);

  return (
    <>
      {props.isSignedIn() ? (
        <PrivateHeader handleSignOut={props.handleSignOut} />
      ) : (
        <Header />
      )}
      <section className="article-intro center">
        <h1>
          {article.title}
          {props.isSignedIn() ? (
            <span
              onClick={() => {
                helperFunction.favArticle(article.slug).then((data) => {
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
    </>
  );
}