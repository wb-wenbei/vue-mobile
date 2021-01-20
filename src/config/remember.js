import store from "../store";

let rememberMe = localStorage.getItem("login_remember_me");
if (rememberMe !== "true") {
  store.dispatch("removeOnLogout");
}
