import { createStore } from "vuex";
import employee from "./modules/employee";
import department from "./modules/department";

const store = createStore({
  modules: {
    employee,
    department,
  },
});

export default store;
