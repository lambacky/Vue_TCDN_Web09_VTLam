import axios from "axios";

const state = {
  departments: [],
};

const mutations = {
  getDepartment(state, payload) {
    state.departments = payload;
  },
};

const actions = {
  /**
   * Lấy dữ liệu phòng ban
   * @param {*} context
   * Author: Vũ Tùng Lâm (30/10/2022)
   */
  async getDepartment(context) {
    try {
      const res = await axios.get(`https://amis.manhnv.net/api/v1/Departments`);
      context.commit("getDepartment", res.data);
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};