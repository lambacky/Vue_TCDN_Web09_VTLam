// import { FormMode, Gender } from "@/enums";
import axios from "axios";
import AlertAction from "@/enums/alertAction";

const state = {
    isShowDialog: false,
    isShowAlert: false,
    formMode: 0,
    filter:{
        pageSize:10,
        pageNumber:1,
        employeeFilter:""
    },
    employees: [],
    employee:{},
    singleEmployee:{},
    totalEmployee: 0,
    totalPage: 0,
    alert:{
        type:"success",
        message:"",
        action:AlertAction.DEFAULT,
    }
}

const mutations = {
    changeFormMode(state, payload) {
        state.formMode = payload;
    },
    toggleDialog(state){
        state.isShowDialog=!state.isShowDialog;
    },
    toggleAlert(state){
        state.isShowAlert=!state.isShowAlert;
    },
    getEmployee(state, payload){
        state.employees = payload.Data;
        state.totalEmployee = payload.TotalRecord;
        state.totalPage = payload.TotalPage;
    },
    setNewEmployeeCode(state,payload){
        state.singleEmployee.EmployeeCode = payload;
        state.employee.EmployeeCode = payload;
    },
    selectEmployee(state,payload){
        state.singleEmployee = payload;
        state.employee = payload;
        // state.employee = JSON.parse(JSON.stringify(payload));
    },
    setFilter(state,payload){
        state.filter.pageSize = payload.pageSize;
        state.filter.pageNumber = payload.pageNumber;
        state.filter.employeeFilter = payload.employeeFilter;
    },
    setAlert(state,payload){
        state.alert = payload;
    }
}

const actions = {
    changeFormMode(context, mode) {
        context.commit("changeFormMode", mode);
    },
    toggleDialog(context) {
        context.commit("toggleDialog");
    },
    toggleAlert(context) {
        context.commit("toggleAlert");
    },
    async getEmployee(context){
        try {
            const res = await axios.get(
              `https://amis.manhnv.net/api/v1/Employees/filter?pageSize=${state.filter.pageSize}&pageNumber=${state.filter.pageNumber}&employeeFilter=${state.filter.employeeFilter}`
            );
      
            context.commit("getEmployee", res.data);
        } catch (error) {
            console.error(error);
        }
    },
    async setNewEmployeeCode(context) {
        try {
          const res = await axios.get(
            `https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode`
          );
          context.commit("setNewEmployeeCode", res.data);
        } catch (error) {
          console.log(error);
        }
    },
    selectEmployee(context,emp){
        context.commit("selectEmployee",emp);
    },
    setFilter(context,filter){
        context.commit("setFilter",filter);
    },
    setAlert(context,alert){
        context.commit("setAlert",alert);
    }
}

export default {
    state,
    mutations,
    actions,
};
  