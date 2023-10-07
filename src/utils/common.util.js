import Cookies from "js-cookie";
export const logout = (history) => {
  // Cookies.remove("x_ufo");
  // Cookies.remove("x_auth_token");
  // Cookies.remove("x_premission"); 
  const cookies = Cookies.get(); // Get all cookie keys
    // Loop through each cookie key and remove it
    for (const cookieKey in cookies) {
      Cookies.remove(cookieKey);
    }
  return history("/");
};