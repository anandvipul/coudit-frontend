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
    let data = JSON.parse(localStorage.getItem("user"));
    if (data !== null) {
      // console.log(data);

      if (data.user !== undefined) {
        // console.log(data.user);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  signOutUser: async () => {
    return localStorage.removeItem("user");
  },
  fetchUserArticle: async (usernameInp, tokenInp) => {
    let dataResult = [];
    // console.log(token);
    let token = tokenInp || JSON.parse(localStorage.getItem("user")).user.token;
    let username =
      usernameInp || JSON.parse(localStorage.getItem("user")).user.username;
    await fetch(`https://api.realworld.io/api/articles?author=${username}`, {
      method: "GET",
      "content-type": "application/json",
      headers: {
        authorization: `Token ${token}`,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        dataResult = data;
        console.log(dataResult);
      });
    return dataResult;
  },
  fetchFavArticle: async (usernameInp, tokenInp) => {
    let dataResult = [];
    let token = tokenInp || JSON.parse(localStorage.getItem("user")).user.token;
    let username =
      usernameInp || JSON.parse(localStorage.getItem("user")).user.username;
    await fetch(`https://api.realworld.io/api/articles?favorited=${username}`, {
      method: "GET",
      headers: {
        authorization: `Token ${token}`,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        dataResult = data;
        console.log(dataResult);
      });
    return dataResult;
  },
  followUser: async (username, tokenInp) => {
    let dataResult = [];
    let token = tokenInp || JSON.parse(localStorage.getItem("user")).user.token;
    await fetch(`https://api.realworld.io/api/profiles/${username}/follow`, {
      method: "POST",
      headers: {
        authorization: `Token ${token}`,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        dataResult = data;
        console.log(dataResult);
      });
    return dataResult;
  },
  unFollowuser: async (username, tokenInp) => {
    let dataResult = [];
    let token = tokenInp || JSON.parse(localStorage.getItem("user")).user.token;
    await fetch(`https://api.realworld.io/api/profiles/${username}/follow`, {
      method: "DELETE",
      headers: {
        authorization: `Token ${token}`,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        dataResult = data;
        console.log(dataResult);
      });
    return dataResult;
  },
  publishArticle: async (body, tokenInp) => {
    let regBody = { article: { ...body } };
    let token = tokenInp || JSON.parse(localStorage.getItem("user")).user.token;
    console.log(regBody);
    let dataArticle = {};
    await fetch("https://api.realworld.io/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
      body: JSON.stringify(regBody),
    })
      .then((data) => data.json())
      .then((data) => (dataArticle = data));
    console.log(dataArticle);
    return dataArticle;
  },
  updateProfile: async (body, tokenInp) => {
    // let { image, username, bio, email, password } = body;
    let regBody = { user: { ...body } };
    let token = tokenInp || JSON.parse(localStorage.getItem("user")).user.token;
    console.log(regBody);
    let dataUser = {};
    await fetch("https://api.realworld.io/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
      body: JSON.stringify(regBody),
    })
      .then((data) => data.json())
      .then((data) => (dataUser = data));
    console.log(dataUser);
    return dataUser;
  },
};

export default helperFunction;
