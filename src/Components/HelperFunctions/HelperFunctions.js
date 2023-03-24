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
  isSignedIn: () => {
    console.log(JSON.parse(localStorage.getItem("user")));
    // return this.state.user.token !== null;
    return localStorage.getItem("user") !== null;
  },
  signOutUser: async () => {
    return localStorage.removeItem("user");
  },
  fetchUserArticle: async (username, token) => {
    let dataResult = [];
    console.log(token);
    await fetch(`https://api.realworld.io/api/articles?author=ajax@ajax.com`, {
      method: "GET",
      "content-type": "application/json",
      Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFqYXhAYWpheC5jb20iLCJ1c2VybmFtZSI6ImFqYXhAYWpheC5jb20iLCJpYXQiOjE2Nzk2NTEwMjUsImV4cCI6MTY4NDgzNTAyNX0.K3o8_qAPxaapl7_cY-AN6N3Z4Gq5arH0bPrYR4vDcio`,
    })
      .then((data) => data.json())
      .then((data) => {
        dataResult = data;
        console.log(dataResult);
      });
    return dataResult;
  },
  fetchFavArticle: async (username, token) => {
    let dataResult = [];
    await fetch(`https://api.realworld.io/api/articles?favorited=${username}`, {
      method: "GET",
      Authorization: `Token ${token}`,
    })
      .then((data) => data.json())
      .then((data) => {
        dataResult = data;
        console.log(dataResult);
      });
    return dataResult;
  },
};

export default helperFunction;
