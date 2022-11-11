import AlertAction from "@/enums/alertAction";
const state = {
    dialogTitle: "Thêm khách hàng",
    isShowLoading:false,
    isShowDialog: false,
    isShowAlert: false,
    formMode: 0,
    filter:{
        pageSize:10,
        pageNumber:1,
        employeeFilter:null
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
    },
    checkedEmployeeIds: []
}
export default state