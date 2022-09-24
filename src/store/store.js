import { createStore } from "vuex";
const store = createStore({
  state: {
    category: "all",
  },
  mutations: {
    category(state, value) {
      // mutate state
      state.category = value;
    },
  },
  actions: {
    setCategory({ commit }, value) {
      commit("category", value);
    },
  },
  getCategory(state) {
    return state.category;
  },
});

export default store;
