import { computed } from "vue";
import { useStorage } from "@vueuse/core";

const state = useStorage("session", {});

export const userId = localStorage.getItem("user_id");
export const token = localStorage.getItem("token");

export const LoggedIn = localStorage.getItem("token")  ? true : false;

export const logout = () => {
  //   state.value = {};
  localStorage.removeItem("user_id");
  localStorage.removeItem("token");
};
