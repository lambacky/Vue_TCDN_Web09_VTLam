const mutations = {
    setDialogTitle(state,payload){
        state.dialogTitle = payload;
    },
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
    toggleCheckedEmployeeIds(state,payload){
        if(!state.checkedEmployeeIds.includes(payload)){
            state.checkedEmployeeIds.push(payload);
        }else{
            state.checkedEmployeeIds = state.checkedEmployeeIds.filter(item => item !== payload);
        }
    },
    getEmployee(state, payload){
        state.employees = payload.Data;
        for (const emp of state.employees){
            if(emp.DateOfBirth){
                emp.DateOfBirth=emp.DateOfBirth.split('T')[0];
            }
            if(emp.IdentityDate){
                emp.IdentityDate=emp.IdentityDate.split('T')[0];
            }
        }
        
        state.totalEmployee = payload.TotalRecord;
        state.totalPage = payload.TotalPage;
        state.checkedEmployeeIds = [];
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
export default mutations