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
  signUpUser: async (body) => {
    let regBody = { user: { ...body } };
    console.log(regBody);
    let dataUser = {};
    await fetch("https://api.realworld.io/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regBody),
    })
      .then((data) => data.json())
      .then((data) => (dataUser = data));
    return dataUser;
  },
  signInUser: async (body) => {
    let regBody = { user: { ...body } };
    console.log(regBody);
    let dataUser = {};
    await fetch("https://api.realworld.io/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regBody),
    })
      .then((data) => data.json())
      .then((data) => (dataUser = data));
    return dataUser;
  },
};

export default helperFunction;
