import { isSignedIn } from "./userService";

export const getTags = async () => {
  let tagsData = {};
  if (isSignedIn()) {
    await fetch(`http://localhost:4001/api/tags`, {
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
    await fetch(`http://localhost:4001/api/tags`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => (tagsData = data));
    return tagsData;
  }
};
