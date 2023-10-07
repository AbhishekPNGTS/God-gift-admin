import Cookies from "js-cookie";

export const getTokenLocal = () => {
  return Cookies.get("x_auth_token");
};


export const getUserLocal = () => {
  const user = Cookies.get("x_ufo");

  if (user !== null && user !== undefined) {
    return JSON.parse(user);
  } else {
    return null;
  }
};

export const setTokenLocal = (token) => {
  Cookies.set("x_auth_token", token, { expires: 30 });
};

export const setUserLocal = (user) => {
  Cookies.set("x_ufo", user, { expires: 30 });
};
