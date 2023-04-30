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
        .then((data) => {
          dataUser = data;
          localStorage.setItem("user", JSON.stringify(dataUser));
        });
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
        .then((data) => {
          dataUser = data;
          localStorage.setItem("user", JSON.stringify(dataUser));
        });
      return dataUser;
    },
    signOutUser: async () => {
      return localStorage.removeItem("user");
    },
  },
  accessProtected: {
    currentUserLocal: () => {
      return JSON.parse(localStorage.getItem("user"));
    },
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
      const { image, username, bio, email, password } = body;
      let regBody = { user: { image, username, bio, email, password } };
      let dataUser = {};
      if (utilityFunctions.admin.isSignedIn()) {
        await fetch("https://api.realworld.io/api/user", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${
              JSON.parse(localStorage.getItem("user")).user.token
            }`,
          },
          body: JSON.stringify(regBody),
        })
          .then((data) => data.json())
          .then((data) => (dataUser = data))
          .catch((error) => (dataUser = error));
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
    createArticle: async (body) => {
      let regBody = { article: { ...body } };

      let dataArticle = {};
      await fetch("https://api.realworld.io/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${
            JSON.parse(localStorage.getItem("user")).user.token
          }`,
        },
        body: JSON.stringify(regBody),
      })
        .then((data) => data.json())
        .then((data) => (dataArticle = data));

      return dataArticle;
    },
    updateArticle: async (body, slug) => {
      let regBody = { article: { ...body } };
      let dataArticle = {};
      await fetch(`https://api.realworld.io/api/articles/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${
            JSON.parse(localStorage.getItem("user")).user.token
          }`,
        },
        body: JSON.stringify(regBody),
      })
        .then((data) => data.json())
        .then((data) => (dataArticle = data));

      return dataArticle;
    },
    deleteArticle: async (slug) => {
      let dataArticle = {};
      await fetch(`https://api.realworld.io/api/articles/${slug}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${
            JSON.parse(localStorage.getItem("user")).user.token
          }`,
        },
      }).then((data) => (dataArticle = data));

      return dataArticle;
    },
    addComment: async (slug, body) => {
      let regBody = {
        comment: {
          body: body,
        },
      };

      let dataComment = {};
      await fetch(`https://api.realworld.io/api/articles/${slug}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${
            JSON.parse(localStorage.getItem("user")).user.token
          }`,
        },
        body: JSON.stringify(regBody),
      })
        .then((data) => data.json())
        .then((data) => (dataComment = data));

      return dataComment;
    },
    deleteComment: async (slug, id) => {
      let dataComment = {};
      await fetch(
        `https://api.realworld.io/api/articles/${slug}/comments/${id}`,
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
        .then((data) => (dataComment = data));
      return dataComment;
    },
    favArticleHandler: async (slug) => {
      let articleData = await utilityFunctions.optionalProtection.getArticle(
        slug
      );
      let dataResult = {};
      //   If The user is being followed then Unfoloow
      if (articleData.article.favorited) {
        await fetch(`https://api.realworld.io/api/articles/${slug}/favorite`, {
          method: "DELETE",
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
      } else {
        await fetch(`https://api.realworld.io/api/articles/${slug}/favorite`, {
          method: "POST",
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
      }
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
    getTags: async () => {
      let tagsData = {};
      if (utilityFunctions.admin.isSignedIn()) {
        await fetch(`https://api.realworld.io/api/tags`, {
          method: "GET",
          headers: {
            authorization: `Token ${
              JSON.parse(localStorage.getItem("user")).user.token
            }`,
          },
        })
          .then((data) => data.json())
          .then((data) => (tagsData = data));
        return tagsData;
      } else {
        await fetch(`https://api.realworld.io/api/tags`, {
          method: "GET",
        })
          .then((data) => data.json())
          .then((data) => (tagsData = data));
        return tagsData;
      }
    },
    getComments: async (slug) => {
      let commentsData = {};
      if (utilityFunctions.admin.isSignedIn()) {
        await fetch(`https://api.realworld.io/api/articles/${slug}/comments`, {
          method: "GET",
          headers: {
            authorization: `Token ${
              JSON.parse(localStorage.getItem("user")).user.token
            }`,
          },
        })
          .then((data) => data.json())
          .then((data) => (commentsData = data));
        return commentsData;
      } else {
        await fetch(`https://api.realworld.io/api/articles/${slug}/comments`, {
          method: "GET",
        })
          .then((data) => data.json())
          .then((data) => (commentsData = data));
        return commentsData;
      }
    },
  },
};

export default utilityFunctions;
