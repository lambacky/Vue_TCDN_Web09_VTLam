import FormMode from "../../enums/formMode.js"
import Gender from "../../enums/gender.js"
import axios from "axios";
import AlertAction from "@/enums/alertAction";

const state = {
    isShowLoading:true,
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
    toggleLoading(state){
        state.isShowLoading=!state.isShowLoading;
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
        state.employee = JSON.parse(JSON.stringify(payload));
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
    /**
     * đổi chế độ của form
     * @param {*} context 
     * @param {*} mode
     * Author:Vũ Tùng Lâm (30/10/2022)
     */
    changeFormMode(context, mode) {
        context.commit("changeFormMode", mode);
    },

    /**
     * Ẩn/hiện form dialog
     * @param {*} context 
     * Author:Vũ Tùng Lâm (30/10/2022)
     */
    toggleDialog(context) {
        context.commit("toggleDialog");
    },

    /**
     * Ẩn/hiện loading
     * @param {*} context 
     * Author:Vũ Tùng Lâm (30/10/2022)
     */
    toggleLoading(context){
        context.commit("toggleLoading");
    },

    /**
     * Ẩn/hiện cảnh báo
     * @param {*} context 
     * Author:Vũ Tùng Lâm (30/10/2022)
     */
    toggleAlert(context) {
        context.commit("toggleAlert");
    },

    /**
     * Xử lí nội dung của cảnh báo
     * @param {*} context 
     * @param {*} alert 
     * Author:Vũ Tùng Lâm (30/10/2022)
     */
    setAlert(context,alert){
        context.commit("setAlert",alert);
        context.dispatch("toggleAlert");
    },

    /**
     * Xử lí bộ lọc danh sách nhân viên
     * @param {*} context
     * @param {*} filter
     * Author:Vũ Tùng Lâm (30/10/2022)
     */
    setFilter(context,filter){
        context.commit("setFilter",filter);
        context.dispatch("toggleLoading");
    },
    

    /**
     * Lấy dữ liệu nhân viên
     * @param {*} context 
     * Author:Vũ Tùng Lâm (30/10/2022)
     */
    async getEmployee(context){
        try {
            const res = await axios.get(
              `https://amis.manhnv.net/api/v1/Employees/filter?pageSize=${state.filter.pageSize}&pageNumber=${state.filter.pageNumber}&employeeFilter=${state.filter.employeeFilter}`
            );
            context.dispatch("toggleLoading");
            context.commit("getEmployee", res.data);
        } catch (error) {
            console.error(error);
        }
    },

    /**
     * Lấy mã nhân viên mới
     * @param {*} context 
     * Author:Vũ Tùng Lâm (30/10/2022)
     */
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

    /**
     * Thêm nhân viên
     * @param {*} context 
     * Author:Vũ Tùng Lâm (30/10/2022)
     */
    async addEmployee(context) {
        try {
            context.dispatch("toggleLoading");
            await axios.post(`https://amis.manhnv.net/api/v1/Employees`, state.employee);
            
            //thông báo thành công
            context.dispatch("setAlert", {
                type: "success",
                message: "Thêm nhân viên thành công",
                action: AlertAction.DEFAULT,
            });
        
            // Check mode
            if (state.formMode === FormMode.STORE) {
                // Cất
                context.dispatch("toggleDialog");
            } else {
                // Cất và thêm
                context.dispatch("changeFormMode", FormMode.STORE);
                context.dispatch("selectEmployee", { Gender: Gender.MALE });
                context.dispatch("setNewEmployeeCode");
            }

            //load lại dữ liệu
            context.dispatch("getEmployee");
        } catch (error) {
            handleException(error, context);
        }
    },

    /**
     * Chỉnh sửa nhân viên
     * @param {*} context 
     * Author:Vũ Tùng Lâm (30/10/2022)
     */
    async editEmployee(context) {
        try {
            context.dispatch("toggleLoading");
            await axios.put(
                `https://amis.manhnv.net/api/v1/Employees/${state.employee.EmployeeId}`,state.employee);
            
            //thông báo thành công
            context.dispatch("setAlert", {
                type: "success",
                message: "Sửa nhân viên thành công",
                action: AlertAction.DEFAULT,
            });
        
            // Check mode
            if (state.formMode === FormMode.EDIT) {
                // Cất
                context.dispatch("toggleDialog");
            } else {
                // Cất và thêm
                context.dispatch("changeFormMode", FormMode.STORE);
                context.dispatch("selectEmployee", { Gender: Gender.MALE });
                context.dispatch("setNewEmployeeCode");
            }

            //load lại dữ liệu
            context.dispatch("getEmployee");
        } catch (error) {
            handleException(error, context);
        }
    },

    /**
     * Xóa nhân viên
     * @param {*} context 
     * @param {string} id
     * Author:Vũ Tùng Lâm (30/10/2022)
     */
    async deleteEmployee(context,id){
        try {
            await axios.delete(`https://amis.manhnv.net/api/v1/Employees/${id}`);

            //thông báo thành công
            context.dispatch("setAlert", {
                type: "success",
                message: "Xóa nhân viên thành công",
                action: AlertAction.DEFAULT,
            });

            //load lại bộ lọc
            context.dispatch("setFilter",{
                pageSize:state.filter.pageSize,
                pageNumber: 1,
                employeeFilter: state.filter.employeeFilter
            })

            //load lại dữ liệu
            context.dispatch("getEmployee");
        } catch (error) {
            handleException(error, context);
        }
    },

    /**
     * Chọn nhân viên
     * @param {*} context 
     * @param {*} emp
     * Author:Vũ Tùng Lâm (30/10/2022)
     */
    selectEmployee(context,emp){
        context.commit("selectEmployee",emp);
    },

}

/**
 * Xử lí lỗi
 * @param {*} error 
 * @param {*} context 
 */
const handleException = (error, context) => {
    context.dispatch("toggleLoading");
    
    //thông báo có lỗi
    context.dispatch("setAlert", {
      type: "danger",
      message: error.response.data.userMsg,
      action: AlertAction.DEFAULT,
    });
  };

export default {
    state,
    mutations,
    actions,
};
  