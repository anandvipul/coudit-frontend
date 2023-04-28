export const isSignedIn = () => {
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
};

export const getProfile = async (username) => {
  let profileData = {};
  if (isSignedIn()) {
    await fetch(`http://localhost:4001/api/profiles/${username}`, {
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
    await fetch(`http://localhost:4001/api/profiles/${username}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => (profileData = data));
    return profileData;
  }
};

export const followUserHandler = async (username) => {
  let userData = await getProfile(username);
  let dataResult = {};
  //   If The user is being followed then Unfoloow
  if (userData.profile.following) {
    await fetch(`http://localhost:4001/api/profiles/${username}/follow`, {
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
    await fetch(`http://localhost:4001/api/profiles/${username}/follow`, {
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

export const updateUser = async (body) => {
  const { image, username, bio, email, password } = body;
  let regBody = { user: { image, username, bio, email, password } };
  let dataUser = {};
  if (isSignedIn()) {
    await fetch("http://localhost:4001/api/user", {
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
};

export const currentUser = async () => {
  let currentSignedInUser = {};
  if (isSignedIn()) {
    await fetch("http://localhost:4001/api/user/", {
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
};

export const currentUserLocal = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const signOutUser = async () => {
  return localStorage.removeItem("user");
};

export const registerUser = async (body) => {
  let regBody = { user: { ...body } };
  let dataUser = {};
  await fetch("http://localhost:4001/api/users", {
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
};

export const authenticateUser = async (body) => {
  let regBody = { user: { ...body } };
  let dataUser = {};
  await fetch("http://localhost:4001/api/users/login", {
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
};
