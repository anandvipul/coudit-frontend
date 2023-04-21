import utilityFunctions from "../services/HelperFunctionV0_2";
import Footer from "../components/Footer";
import LoaderScreen from "./LoaderScreen";
import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import Main from "../components/Main";
import Hero from "../components/Hero";

function Home() {
  let [posts, setPosts] = useState([]);
  let [tags, setTags] = useState([]);
  let [mode, setMode] = useState("global");
  let [tag, setTag] = useState("");
  let [triger, setTriger] = useState(true);
  let { user } = useUser();

  useEffect(() => {
    utilityFunctions.optionalProtection
      .listArticles()
      .then((data) => setPosts(data.articles));
  }, [user]);

  useEffect(() => {
    if (mode === "global") {
      utilityFunctions.optionalProtection
        .listArticles()
        .then((data) => setPosts(data.articles));
    } else if (mode === "tags") {
      utilityFunctions.optionalProtection
        .listArticlesByTag(tag)
        .then((data) => setPosts(data.articles));
    } else {
      utilityFunctions.optionalProtection
        .listArticles()
        .then((data) => setPosts(data.articles));
    }
  }, [tag, mode, triger]);

  useEffect(() => {
    utilityFunctions.optionalProtection
      .getTags()
      .then((data) => setTags(data.tags));

    utilityFunctions.optionalProtection
      .listArticles()
      .then((data) => setPosts(data.articles));
  }, []);

  return (
    <>
      {/* {posts.length ? (
        <>
          <Hero title={"Conduit"} sub={"A place to Share Your Knowlege"} />
          <Main
            activeMode={mode}
            activeModeChanger={setMode}
            activeTag={tag}
            activeTagHandler={setTag}
            renderPost={posts}
            renderTags={tags}
            triger={triger}
            setTriger={setTriger}
          />
          <Footer />
        </>
      ) : (
        <LoaderScreen />
      )} */}
      <Hero title={"Conduit"} sub={"A place to Share Your Knowlege"} />
      <Main
        activeMode={mode}
        activeModeChanger={setMode}
        activeTag={tag}
        activeTagHandler={setTag}
        renderPost={posts}
        renderTags={tags}
        triger={triger}
        setTriger={setTriger}
      />
      <Footer />
    </>
  );
}

export default Home;
