import { createRouter, createWebHistory } from "vue-router";
// import "../src/assets/css/index.css";
import Home from "../../src/views/Home.vue";
import CreateRecipe from "../../src/views/CreateRecipe.vue";
import Description from "../../src/views/Description.vue";
import Register from "../../src/views/Register.vue";
import MY_FOODS from "../../src/views/MyFoods.vue";
import EDIT_RECIPE from "../../src/views/EditRecipe.vue";
import Login from "../../src/views/Login.vue";
import Saved from "../../src/views/Saved.vue";
import AuthGuard from "../utils/AuthGuard.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/register", name: "REGISTER", component: Register },
    { path: "/login", name: "LOGIN", component: Login },
    { path: "/saved", name: "SAVED", component: Saved, beforeEnter: AuthGuard },
    {
      path: "/description/:id",
      name: "DESCRIPTION",
      component: Description,
      beforeEnter: AuthGuard,
    },
    {
      path: "/create_recipe",
      name: "ADD_RECIPE",
      component: CreateRecipe,
      beforeEnter: AuthGuard,
    },
    {
      path: "/my_foods",
      name: "MY_FOODS",
      component: MY_FOODS,
      beforeEnter: AuthGuard,
    },
    {
      path: "/edit_recipe/:id",
      name: "EDIT_FOODS",
      component: EDIT_RECIPE,
      beforeEnter: AuthGuard,
    },
  ],
});

export default router;
