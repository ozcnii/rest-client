import { createStore } from "vuex";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { state } from "./state";

const store = createStore({
  state,
  getters,
  mutations,
  actions,
});

export { store };
