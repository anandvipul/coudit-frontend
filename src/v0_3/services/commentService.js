import { isSignedIn } from "./userService";

export const getComments = async (slug) => {
  let commentsData = {};
  if (isSignedIn()) {
    await fetch(`http://localhost:4001/api/articles/${slug}/comments`, {
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
    await fetch(`http://localhost:4001/api/articles/${slug}/comments`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => (commentsData = data));
    return commentsData;
  }
};

export const addComment = async (slug, body) => {
  let regBody = {
    comment: {
      body: body,
    },
  };

  let dataComment = {};
  await fetch(`http://localhost:4001/api/articles/${slug}/comments`, {
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
};

export const deleteComment = async (slug, id) => {
  let dataComment = {};
  await fetch(`http://localhost:4001/api/articles/${slug}/comments/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Token ${
        JSON.parse(localStorage.getItem("user")).user.token
      }`,
    },
  })
    .then((data) => data.json())
    .then((data) => (dataComment = data));
  return dataComment;
};
