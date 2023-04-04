let utilityFunctions = {
  admin: {
    isSignedIn: () => {
      let data = JSON.parse(localStorage.getItem("user"));
      if (data !== null) {
        if (data.user !== undefined) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    authenticateUser: async (body) => {
      let regBody = { user: { ...body } };
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
    registerUser: async (body) => {
      let regBody = { user: { ...body } };
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
  },
  accessProtected: {
    currentUser: async () => {
      let currentSignedInUser = {};
      if (utilityFunctions.admin.isSignedIn()) {
        await fetch("https://api.realworld.io/api/user/", {
          method: "GET",
          headers: {
            authorization: `Token ${
              JSON.parse(localStorage.getItem("user")).user.token
            }`,
          },
        })
          .then((data) => data.json())
          .then((data) => {
            currentSignedInUser = data;
          });
        return currentSignedInUser;
      } else {
        return { error: "not signed in" };
      }
    },
    updateUser: async (body) => {
      let regBody = { user: { ...body } };
      let dataUser = {};
      if (utilityFunctions.admin.isSignedIn()) {
        await fetch("https://api.realworld.io/api/user", {
          method: "PUT",
          headers: {
            authorization: `Token ${
              JSON.parse(localStorage.getItem("user")).user.token
            }`,
          },
          body: JSON.stringify(regBody),
        })
          .then((data) => data.json())
          .then((data) => (dataUser = data));
        return dataUser;
      } else {
        return { error: "not signed in" };
      }
    },
    followUserHandler: async (username) => {
      let userData = await utilityFunctions.optionalProtection.getProfile(
        username
      );
      let dataResult = {};
      //   If The user is being followed then Unfoloow
      if (userData.profile.following) {
        await fetch(
          `https://api.realworld.io/api/profiles/${username}/follow`,
          {
            method: "DELETE",
            headers: {
              authorization: `Token ${
                JSON.parse(localStorage.getItem("user")).user.token
              }`,
            },
          }
        )
          .then((data) => data.json())
          .then((data) => {
            dataResult = data;
          });
        return dataResult;
      } else {
        await fetch(
          `https://api.realworld.io/api/profiles/${username}/follow`,
          {
            method: "POST",
            headers: {
              authorization: `Token ${
                JSON.parse(localStorage.getItem("user")).user.token
              }`,
            },
          }
        )
          .then((data) => data.json())
          .then((data) => {
            dataResult = data;
          });
        return dataResult;
      }
    },
    feedArticles: async () => {
      let dataResult = [];
      await fetch("https://api.realworld.io/api/articles/?limit=10&offset=0", {
        method: "GET",
        headers: {
          authorization: `Token ${
            JSON.parse(localStorage.getItem("user")).user.token
          }`,
        },
      })
        .then((data) => data.json())
        .then((data) => {
          dataResult = data;
        });
      return dataResult;
    },
  },
  optionalProtection: {
    getProfile: async (username) => {
      let profileData = {};
      if (utilityFunctions.admin.isSignedIn()) {
        await fetch(`https://api.realworld.io/api/profiles/${username}`, {
          method: "GET",
          headers: {
            authorization: `Token ${
              JSON.parse(localStorage.getItem("user")).user.token
            }`,
          },
        })
          .then((data) => data.json())
          .then((data) => (profileData = data));
        return profileData;
      } else {
        await fetch(`https://api.realworld.io/api/profiles/${username}`, {
          method: "GET",
        })
          .then((data) => data.json())
          .then((data) => (profileData = data));
        return profileData;
      }
    },
    listArticles: async () => {
      let articlesData = {};
      if (utilityFunctions.admin.isSignedIn()) {
        await fetch(`https://api.realworld.io/api/articles?limit=10&offset=0`, {
          method: "GET",
          headers: {
            authorization: `Token ${
              JSON.parse(localStorage.getItem("user")).user.token
            }`,
          },
        })
          .then((data) => data.json())
          .then((data) => (articlesData = data));
        return articlesData;
      } else {
        await fetch(`https://api.realworld.io/api/articles?limit=10&offset=0`, {
          method: "GET",
        })
          .then((data) => data.json())
          .then((data) => (articlesData = data));
        return articlesData;
      }
    },
    listArticlesByTag: async (tag) => {
      let articlesData = {};
      if (utilityFunctions.admin.isSignedIn()) {
        await fetch(
          `https://api.realworld.io/api/articles?tag=${tag}&limit=10&offset=0`,
          {
            method: "GET",
            headers: {
              authorization: `Token ${
                JSON.parse(localStorage.getItem("user")).user.token
              }`,
            },
          }
        )
          .then((data) => data.json())
          .then((data) => (articlesData = data));
        return articlesData;
      } else {
        await fetch(
          `https://api.realworld.io/api/articles?tag=${tag}&limit=10&offset=0`,
          {
            method: "GET",
          }
        )
          .then((data) => data.json())
          .then((data) => (articlesData = data));
        return articlesData;
      }
    },
    listArticlesByAuthor: async (author) => {
      let articlesData = {};
      if (utilityFunctions.admin.isSignedIn()) {
        await fetch(
          `https://api.realworld.io/api/articles?author=${author}&limit=10&offset=0`,
          {
            method: "GET",
            headers: {
              authorization: `Token ${
                JSON.parse(localStorage.getItem("user")).user.token
              }`,
            },
          }
        )
          .then((data) => data.json())
          .then((data) => (articlesData = data));
        return articlesData;
      } else {
        await fetch(
          `https://api.realworld.io/api/articles?author=${author}&limit=10&offset=0`,
          {
            method: "GET",
          }
        )
          .then((data) => data.json())
          .then((data) => (articlesData = data));
        return articlesData;
      }
    },
    listArticlesByFav: async (fav) => {
      let articlesData = {};
      if (utilityFunctions.admin.isSignedIn()) {
        await fetch(
          `https://api.realworld.io/api/articles?favorited=${fav}&limit=10&offset=0`,
          {
            method: "GET",
            headers: {
              authorization: `Token ${
                JSON.parse(localStorage.getItem("user")).user.token
              }`,
            },
          }
        )
          .then((data) => data.json())
          .then((data) => (articlesData = data));
        return articlesData;
      } else {
        await fetch(
          `https://api.realworld.io/api/articles?favorited=${fav}&limit=10&offset=0`,
          {
            method: "GET",
          }
        )
          .then((data) => data.json())
          .then((data) => (articlesData = data));
        return articlesData;
      }
    },
    getArticle: async (slug) => {
      let articleData = {};
      if (utilityFunctions.admin.isSignedIn()) {
        await fetch(`https://api.realworld.io/api/articles/${slug}`, {
          method: "GET",
          headers: {
            authorization: `Token ${
              JSON.parse(localStorage.getItem("user")).user.token
            }`,
          },
        })
          .then((data) => data.json())
          .then((data) => (articleData = data));
        return articleData;
      } else {
        await fetch(`https://api.realworld.io/api/articles/${slug}`, {
          method: "GET",
        })
          .then((data) => data.json())
          .then((data) => (articleData = data));
        return articleData;
      }
    },
  },
};

export default utilityFunctions;
