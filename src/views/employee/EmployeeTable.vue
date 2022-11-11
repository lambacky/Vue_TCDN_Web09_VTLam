<template>
    <div class="table-wrapper">
                <table id="empTable">
                    <thead>
                        <tr>
                            <th>
                                <input @change="checkAll" id="checkboxAll" class="input-checkbox" type="checkbox">
                            </th>
                            <th style="min-width:140px">MÃ NHÂN VIÊN</th>
                            <th style="min-width:170px">TÊN NHÂN VIÊN</th>
                            <th style="min-width:105px">GIỚI TÍNH</th>
                            <th class="date" style="min-width:120px">NGÀY SINH</th>
                            <th title="Số chứng minh thư nhân dân" style="min-width:150px">SỐ CMND</th>
                            <th style="min-width:120px">CHỨC DANH</th>
                            <th style="min-width:230px">TÊN ĐƠN VỊ</th>
                            <th style="min-width:150px">SỐ TÀI KHOẢN</th>
                            <th style="min-width:160px">TÊN NGÂN HÀNG</th>
                            <th title="Chi nhánh tài khoản ngân hàng" style="min-width:240px">CHI NHÁNH TK NGÂN HÀNG</th>
                            <th class="function" style="min-width:120px">CHỨC NĂNG</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(emp,index) in employees" :key="index" @dblclick="modifyForm(emp)">
                                <td @dblclick.stop>
                                    <input @change="checkOne(emp.EmployeeId)" class="input-checkbox" type="checkbox">
                                </td>
                                <td>{{emp.EmployeeCode}}</td>
                                <td>{{emp.EmployeeName}}</td>
                                <td>{{emp.GenderName}}</td>
                                <td class="date">{{formatDate(emp.DateOfBirth)}}</td>
                                <td>{{emp.IdentityNumber}}</td>
                                <td>{{emp.EmployeePosition}}</td>
                                <td>{{emp.DepartmentName}}</td>
                                <td>{{emp.BankAccountNumber}}</td>
                                <td>{{emp.BankName}}</td>
                                <td>{{emp.BankBranchName}}</td>
                                <td @dblclick.stop :style="{'z-index': employees.length-index}">
                                    <div class="table-function">
                                        <div class="modify" @click="modifyForm(emp)">Sửa</div>
                                        <div class="dropdown context-menu">
                                            <div class="icon dropdown-button icon-arrow-down-blue" @click="toggleList"></div>
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
        checkedEmployeeIds: (state) => state.employee.checkedEmployeeIds,
    }),
    
    methods: {
        ...mapActions([
            "changeFormMode",
            "toggleDialog",
            "toggleAlert",
            "toggleCheckedEmployeeIds",
            "getEmployee",
            "selectEmployee",
            "setAlert",
            "setDialogTitle",

        ]),

        /**
         * format lại ngày tháng
         * @param {date} dob
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
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

        /**
         * chỉnh sửa nhân viên
         * @param {*} emp
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        modifyForm(emp){
            const me = this;
            me.setDialogTitle("Sửa khách hàng");
            me.changeFormMode(FormMode.EDIT);
            me.selectEmployee(emp);
            me.toggleDialog();
        },

        /**
         * chọn xóa nhân viên
         * @param {*} emp
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        selectDelete(emp){
            const me = this;
            me.selectEmployee(emp);
            me.setAlert({
                type:"warning",
                message: `Bạn có thực sự muốn xóa Nhân viên <${me.singleEmployee.EmployeeCode}> không?`,
                action: AlertAction.CONFIRM_DELETE
            });

        },

        /**
         * check tất cả checkbox
         * @param {*} event
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        checkAll(event){
            const me=this;
            let checkboxes = document.querySelectorAll("tbody input");
            checkboxes.forEach(checkbox=>{checkbox.checked=event.target.checked});
            if(event.target.checked==true){
                for(const emp of me.employees){
                    if(!me.checkedEmployeeIds.includes(emp.EmployeeId)){
                        me.toggleCheckedEmployeeIds(emp.EmployeeId);
                    }
                }
            }else{
                for(const emp of me.employees){
                        me.toggleCheckedEmployeeIds(emp.EmployeeId);
                }
            }
        },

        /**
         * check từng checkbox
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        checkOne(id){
            const me=this;
            document.querySelector('#checkboxAll').checked = (document.querySelectorAll("tbody input:checked").length==document.querySelectorAll("tbody input").length);
            me.toggleCheckedEmployeeIds(id);
        },

        /**
         * Ẩn/hiện dropdown
         * @param {*} event
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        toggleList(event){
            let dropdownList = event.target.nextElementSibling;
            if(dropdownList.style.display=="block"){
                dropdownList.style.display="none";
            }else{
                dropdownList.style.display="block";
            }
        },
    },
    mounted(){
        /**
         * Ẩn dropdown khi click bên ngoài
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        document.addEventListener('click',function(event){
            document.querySelectorAll(".dropdown-list").forEach(item => {
                if ((event.target!=item.previousElementSibling)) {
                    item.style.display="none";
                }
            });
        });
    },
    data() {
        return {
            isShowList:false,
        }
    },
}
</script>