import { LoggedIn } from "./user.js";

export default (to, from, next) => {
  if (!LoggedIn) {
    return next("/login");
  } else {
    next();
  }
};
