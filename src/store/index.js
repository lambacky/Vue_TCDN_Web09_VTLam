import { createStore } from "vuex";
import employee from "./modules/employee/index";
import department from "./modules/department/index";

const store = createStore({
  modules: {
    employee,
    department,
  },
});

export default store;
