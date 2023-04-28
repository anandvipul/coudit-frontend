import { isSignedIn } from "./userService";

export const feedArticles = async () => {
  let dataResult = [];
  await fetch("http://localhost:4001/api/articles/?limit=10&offset=0", {
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
};

export const createArticle = async (body) => {
  body.tagList = body.tagList ? (body.tagList = body.tagList.split(";")) : "";
  let regBody = { article: { ...body } };

  let dataArticle = {};
  await fetch("http://localhost:4001/api/articles", {
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
};

export const updateArticle = async (body, slug) => {
  let regBody = { article: { ...body } };
  let dataArticle = {};
  await fetch(`http://localhost:4001/api/articles/${slug}`, {
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
};

export const deleteArticle = async (slug) => {
  let dataArticle = {};
  await fetch(`http://localhost:4001/api/articles/${slug}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Token ${
        JSON.parse(localStorage.getItem("user")).user.token
      }`,
    },
  }).then((data) => (dataArticle = data));

  return dataArticle;
};

export const favArticleHandler = async (slug) => {
  let articleData = await getArticle(slug);
  let dataResult = {};
  //   If The user is being followed then Unfoloow
  if (articleData.article.favorited) {
    await fetch(`http://localhost:4001/api/articles/${slug}/favorite`, {
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
    await fetch(`http://localhost:4001/api/articles/${slug}/favorite`, {
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
};

export const listArticles = async () => {
  let articlesData = {};
  if (isSignedIn()) {
    await fetch(`http://localhost:4001/api/articles?limit=10&offset=0`, {
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
    await fetch(`http://localhost:4001/api/articles?limit=10&offset=0`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => (articlesData = data));
    return articlesData;
  }
};

export const listArticlesByTag = async (tag) => {
  let articlesData = {};
  if (isSignedIn()) {
    await fetch(
      `http://localhost:4001/api/articles?tag=${tag}&limit=10&offset=0`,
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
      `http://localhost:4001/api/articles?tag=${tag}&limit=10&offset=0`,
      {
        method: "GET",
      }
    )
      .then((data) => data.json())
      .then((data) => (articlesData = data));
    return articlesData;
  }
};

export const listArticlesByAuthor = async (author) => {
  let articlesData = {};
  if (isSignedIn()) {
    await fetch(
      `http://localhost:4001/api/articles?author=${author}&limit=10&offset=0`,
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
      `http://localhost:4001/api/articles?author=${author}&limit=10&offset=0`,
      {
        method: "GET",
      }
    )
      .then((data) => data.json())
      .then((data) => (articlesData = data));
    return articlesData;
  }
};

export const listArticlesByFav = async (fav) => {
  let articlesData = {};
  if (isSignedIn()) {
    await fetch(
      `http://localhost:4001/api/articles?favorited=${fav}&limit=10&offset=0`,
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
      `http://localhost:4001/api/articles?favorited=${fav}&limit=10&offset=0`,
      {
        method: "GET",
      }
    )
      .then((data) => data.json())
      .then((data) => (articlesData = data));
    return articlesData;
  }
};

export const getArticle = async (slug) => {
  let articleData = {};
  if (isSignedIn()) {
    await fetch(`http://localhost:4001/api/articles/${slug}`, {
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
    await fetch(`http://localhost:4001/api/articles/${slug}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => (articleData = data));
    return articleData;
  }
};
