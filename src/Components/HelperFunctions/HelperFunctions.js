let helperFunction = {
  fetchArticles: async () => {
    let dataResult = [];
    await fetch("https://api.realworld.io/api/articles", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        dataResult = data;
      });
    return dataResult;
  },
  fetchArticlesTag: async (tag) => {
    let dataResult = [];
    let url = "https://api.realworld.io/api/articles?tag=" + tag;
    await fetch(`https://api.realworld.io/api/articles?tag=${tag}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        dataResult = data;
        console.log(tag);
      });
    return dataResult;
  },
  fetchTags: async () => {
    let dataResult = [];
    await fetch("https://api.realworld.io/api/tags", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        dataResult = data;
      });
    return dataResult;
  },
};

export default helperFunction;
