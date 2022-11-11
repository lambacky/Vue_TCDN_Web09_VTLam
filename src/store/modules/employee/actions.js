import FormMode from "@/enums/formMode";
import Gender from "@/enums/gender";
import AlertAction from "@/enums/alertAction";
import CONST_API from "@/enums/api.js";
import axios from "axios";
import state from "./state"
const actions = {
    /**
     * Đặt tiêu đề cho form nhân viên
     * @param {*} context 
     * @param {*} title 
     */
    setDialogTitle(context,title){
        context.commit("setDialogTitle", title);
    },
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
    toggleCheckedEmployeeIds(context,id){
        context.commit("toggleCheckedEmployeeIds",id);
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
            `${CONST_API}/filter`, {params:{pageSize: state.filter.pageSize, pageNumber:state.filter.pageNumber,employeeFilter:state.filter.employeeFilter}}
            );
            document.querySelectorAll("table input").forEach(checkbox => checkbox.checked=false);
            context.dispatch("toggleLoading");
            context.commit("getEmployee", res.data);
        } catch (error) {
            context.dispatch("toggleLoading");
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
            `${CONST_API}/NewEmployeeCode`
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
            await axios.post(`${CONST_API}`, state.employee);
            
            //thông báo thành công
            context.dispatch("setAlert", {
                type: "success",
                message: "Thêm nhân viên thành công",
                action: AlertAction.DEFAULT,
            });
        
            // Check mode
            if (state.formMode == FormMode.STORE) {
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
                `${CONST_API}/${state.employee.EmployeeId}`,state.employee);
            
            //thông báo thành công
            context.dispatch("setAlert", {
                type: "success",
                message: "Sửa nhân viên thành công",
                action: AlertAction.DEFAULT,
            });
        
            // Check mode
            if (state.formMode == FormMode.EDIT) {
                // Cất
                context.dispatch("toggleDialog");
            } else {
                // Cất và thêm
                context.dispatch("setDialogTitle","Thêm khách hàng");
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
    async deleteEmployee(context){
        try {
            await axios.delete(`${CONST_API}/${state.employee.EmployeeId}`);

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
     * Xóa hàng loạt nhân viên
     * @param {*} context 
     * @param {string} id
     * Author:Vũ Tùng Lâm (30/10/2022)
     */
     async deleteBatchEmployee(context){
        try {
            
            await axios.post(`${CONST_API}/deleteBatch`,state.checkedEmployeeIds);
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
    console.log(error);
    //thông báo có lỗi
    context.dispatch("setAlert", {
      type: "danger",
      message: error.response.data.UserMsg,
      action: AlertAction.DEFAULT,
    });
};

export default actions