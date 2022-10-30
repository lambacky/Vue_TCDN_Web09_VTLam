<template>
    <div class="table-wrapper">
                <table id="empTable">
                    <thead>
                        <tr>
                            <th>
                                <input id="checkboxAll" class="input-checkbox" type="checkbox">
                            </th>
                            <th style="min-width:150px">MÃ NHÂN VIÊN</th>
                            <th style="min-width:170px">TÊN NHÂN VIÊN</th>
                            <th style="min-width:105px">GIỚI TÍNH</th>
                            <th class="date" style="min-width:120px">NGÀY SINH</th>
                            <th title="Số chứng minh thư nhân dân" style="min-width:150px">SỐ CMND</th>
                            <th style="min-width:140px">CHỨC DANH</th>
                            <th style="min-width:200px">TÊN ĐƠN VỊ</th>
                            <th style="min-width:150px">SỐ TÀI KHOẢN</th>
                            <th style="min-width:300px">TÊN NGÂN HÀNG</th>
                            <th title="Chi nhánh tài khoản ngân hàng" style="min-width:300px">CHI NHÁNH TK NGÂN HÀNG</th>
                            <th class="function" style="min-width:120px">CHỨC NĂNG</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(emp,index) in employees" :key="index" @dblclick="modifyForm(emp)">
                                <td>
                                    <input class="input-checkbox" type="checkbox">
                                </td>
                                <td id="employeeCodeCell">{{emp.EmployeeCode}}</td>
                                <td>{{emp.EmployeeName}}</td>
                                <td>{{emp.GenderName}}</td>
                                <td class="date">{{formatDate(emp.DateOfBirth)}}</td>
                                <td>{{emp.IdentityNumber}}</td>
                                <td>{{emp.EmployeePosition}}</td>
                                <td>{{emp.DepartmentName}}</td>
                                <td>{{emp.BankAccountNumber}}</td>
                                <td>{{emp.BankName}}</td>
                                <td>{{emp.BankBranchName}}</td>
                                <td :style="{'z-index': totalEmployee-index}">
                                    <div class="table-function">
                                        <div class="modify" @click="modifyForm(emp)">Sửa</div>
                                        <div class="dropdown context-menu">
                                            <div class="icon dropdown-button icon-arrow-down-blue" @click="toggle"></div>
                                            <div class="dropdown-list">
                                                <div class="dropdown-item">Nhân bản</div>
                                                <div @click="selectDelete(emp)" class="dropdown-item delete-item">Xóa</div>
                                                <div class="dropdown-item">Ngưng sử dụng</div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                    </tbody>
                </table>
            </div>
</template>

<script>
import  FormMode  from "../../enums/formMode.js"
import AlertAction from "../../enums/alertAction.js"
import { mapActions, mapState } from "vuex"
export default {
    name:"EmployeeTable",
    computed: mapState({
        employees: (state) => state.employee.employees,
        totalEmployee: (state) => state.employee.totalEmployee,
        singleEmployee: (state) => state.employee.singleEmployee,
    }),
    methods: {
        ...mapActions([
            "changeFormMode",
            "toggleDialog",
            "toggleAlert",
            "getEmployee",
            "selectEmployee",
            "setAlert",

        ]),
        formatDate(dob){
            if (dob) {
                dob = new Date(dob);
                // Lấy ngày
                let date = dob.getDate();
                date = date < 10 ? `0${date}` : date;
                // Lấy tháng
                let month = dob.getMonth() + 1;
                month = month < 10 ? `0${month}` : month;
                // Lấy năm
                let year = dob.getFullYear();

                dob = `${date}/${month}/${year}`;
            }
            return dob;
        },

        modifyForm(emp){
            this.changeFormMode(FormMode.EDIT);
            this.selectEmployee(emp);
            this.toggleDialog();
        },
        toggle(event){
            let dropdownList = event.target.nextElementSibling;
            if(dropdownList.style.display=="block"){
                dropdownList.style.display="none";
            }else{
                dropdownList.style.display="block";
            }
        },
        selectDelete(emp){
            this.selectEmployee(emp);
            this.setAlert({
                type:"warning",
                message: `Bạn có thực sự muốn xóa Nhân viên <${this.singleEmployee.EmployeeCode}> không?`,
                action: AlertAction.CONFIRM_DELETE
            });
            this.toggleAlert();
        },
    },
    data() {
        return {
            isShowList:false,
        }
    },
}
</script>