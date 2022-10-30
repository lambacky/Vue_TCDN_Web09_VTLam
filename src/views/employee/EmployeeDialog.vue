<template>
    <div id="formDialog" class="dialog-wrapper">
        <div class="dialog dialog-add-emp">
            <div class="dialog-header">
                <div class="dialog-header-left">
                    <div id="formTitle" class="dialog-title"></div>
                    <div class="input-checkbox-wrapper">
                        <input class="input-checkbox" type="checkbox">
                        <label class="input-checkbox-label">Là khách hàng</label>
                    </div>
                    <div class="input-checkbox-wrapper">
                        <input class="input-checkbox" type="checkbox">
                        <label class="input-checkbox-label">Là nhà cung cấp</label>
                    </div>
                </div>
                <div class="dialog-header-right">
                    <div class="icon icon-help" title="Trợ giúp"></div>
                    <div @click="escDialog" id="btnEsc" class="icon icon-close" title="Thoát"></div>
                </div>
            </div>
            <form id="employeeForm" class="dialog-body">
                <div class="dialog-body-top">
                    <div class="dialog-body-left w-50">
                        <div class="row-flex">
                            <div class="input-wrapper w-40" >
                                <label class="input-label">Mã <span class="require-mark">*</span></label>
                                <input ref="EmployeeCode" v-model="employee.EmployeeCode" id="employeeCode" type="text" required class="required input" name="EmployeeCode" tabindex="1">
                                <span class="input-error-mess">&lt;Mã&gt; không được để trống</span>
                            </div>
                            <div class="input-wrapper flex-1">
                                <label class="input-label">Tên <span class="require-mark">*</span></label>
                                <input v-model="employee.EmployeeName" id="employeeName" type="text" required class="required input" name="EmployeeName" tabindex="2">
                                <span class="input-error-mess">&lt;Tên&gt; không được để trống</span>
                            </div>
                        </div>
                        
                        <div class="input-wrapper" style="overflow:visible">
                            <label class="input-label">Đơn vị <span class="require-mark">*</span></label>
                            <div class="combobox">
                                <input v-model="employee.DepartmentId" id="departmentId" type="hidden" name="DepartmentId">
                                <input v-model="employee.DepartmentName" id="departmentName" required class=" required input combobox-input" type="text" name="DepartmentName" readonly tabindex="7">
                                <span class="input-error-mess">&lt;Đơn vị&gt; không được để trống</span>
                                <div class="combobox-button" @click="toggleList">
                                    <div class="icon icon-arrow-dropdown"></div>
                                </div>
                                <div v-if="isShowList" id="departmentList" class="combobox-data department-list">
                                    <div v-for="(dep,index) in departments" :key="index" class="data-item department-item" :class="{ 'checked': dep.DepartmentName == employee.DepartmentName }" @click="selectDepartment(dep)">{{dep.DepartmentName}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="input-wrapper">
                            <label class="input-label">Chức danh</label>
                            <input v-model="employee.EmployeePosition" id="employeePosition" type="text" class="input" name="EmployeePosition" tabindex="10">
                        </div>
                    </div>
                    <div class="dialog-body-right w-50">
                        <div class="row-flex">
                            <div class="input-wrapper w-40">
                                <label class="input-label">Ngày sinh</label>
                                <input ref="DateOfBirth" :value="employee.DateOfBirth? employee.DateOfBirth.split('T')[0] : null" @input="selectDate" id="dateOfBirth" type="date" class="input input-date" name="DateOfBirth" tabindex="3">
                                <span class="input-error-mess">&lt;Ngày sinh&gt; không được lớn hơn hiện tại</span>
                            </div>
                            <div class="input-wrapper flex-1">
                                <label class="input-label">Giới tính</label>
                                <div class="input-checkbox-list gender-list">
                                    <div class="input-checkbox-wrapper">
                                        <input class="input-checkbox" type="radio" value="1" name="Gender" :checked="employee.Gender === 1" tabindex="4">
                                        <label class="input-label">Nam</label>
                                    </div>
                                    <div class="input-checkbox-wrapper">
                                        <input class="input-checkbox" type="radio" value="0" name="Gender" :checked="employee.Gender === 0" tabindex="5">
                                        <label class="input-label">Nữ</label>
                                    </div>
                                    <div class="input-checkbox-wrapper">
                                        <input class="input-checkbox" type="radio" value="2" name="Gender" :checked="employee.Gender === 2" tabindex="6">
                                        <label class="input-label">Khác</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-flex">
                            <div class="input-wrapper w-60">
                                <label class="input-label" title="Số chứng minh nhân dân">Số CMND</label>
                                <input v-model="employee.IdentityNumber" id="indentityNumber" type="text" class="input" name="IdentityNumber" tabindex="8">
                            </div>
                            <div class="input-wrapper flex-1">
                                <span class="input-label">Ngày cấp</span>
                                <input ref="IdentityDate" :value="employee.IndentiyDate? employee.IdentityDate.split('T')[0] :null" @input="selectDate" id="identityDate" type="date" class="input input-date" name="IdentityDate" tabindex="9">
                                <span class="input-error-mess">&lt;Ngày cấp&gt; không được lớn hơn hiện tại</span>
                            </div>
                        </div>
                        <div class="input-wrapper">
                            <span class="input-label">Nơi cấp</span>
                            <input v-model="employee.IdentityPlace" id="identityPlace" type="text" class="input" name="IdentityPlace" tabindex="11">
                        </div>
                </div>
                
                </div>
                <div class="dialog-body-bottom">
                    <div class="input-wrapper" >
                        <label class="input-label">Địa chỉ</label>
                        <input v-model="employee.Address" id="address" type="text" class="input" name="Address" tabindex="12">
                    </div>
                    <div class="row-flex">
                        <div class="input-wrapper w-25" >
                            <label class="input-label" title="điện thoại di động">ĐT di động</label>
                            <input v-model="employee.TelephoneNumber" id="telephoneNumber" type="text" class="input" name="TelephoneNumber" tabindex="13">
                        </div>
                        <div class="input-wrapper w-25" >
                            <label class="input-label" title="điện thoại cố định">ĐT cố định</label>
                            <input v-model="employee.PhoneNumber" id="phoneNumber" type="text" class="input" name="PhoneNumber" tabindex="14">
                        </div>
                        <div class="input-wrapper w-25" >
                            <label class="input-label">Email</label>
                            <input v-model="employee.Email" id="email" type="text" class="input" name="Email" tabindex="15">
                            <span class="input-error-mess">&lt;Email&gt; không đúng định dạng</span>
                        </div>
                        <div class="w-25"></div>
                    </div>
                    <div class="row-flex">
                        <div class="input-wrapper w-25" >
                            <label class="input-label">Tài khoản ngân hàng</label>
                            <input v-model="employee.BankAccountNumber" id="bankAccountNumber" type="text" class="input" name="BankAccountNumber" tabindex="16">
                        </div>
                        <div class="input-wrapper w-25" >
                            <label class="input-label">Tên ngân hàng</label>
                            <input v-model="employee.BankName" id="bankName" type="text" class="input" name="BankName" tabindex="17">
                        </div>
                        <div class="input-wrapper w-25" >
                            <label class="input-label">Chi nhánh</label>
                            <input v-model="employee.BankBranchName" id="bankBranchName" type="text" class="input" name="BankBranchName" tabindex="18">
                        </div>
                        <div class="w-25"></div>
                    </div>
                </div>
            </form>
            <div class="dialog-footer">
                <button  class="btn btn-secondary btn-close" tabindex="21" @click="toggleDialog">Hủy</button>
                <div class="btn-action">
                    <button ref="btnSave" @click="saveData" id="btnSave" class="btn btn-secondary btn-store" tabindex="20">Cất</button>
                    <button @click="saveAddData" id="btnSaveAdd" class="btn btn-store-add" tabindex="19">Cất và thêm</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
import FormMode from "../../enums/formMode.js"
import AlertAction from "../../enums/alertAction.js"

export default {
    name:"EmployeeDialog",
    computed: mapState({
        isShowDialog: (state) => state.employee.isShowDialog,
        formMode: (state) => state.employee.formMode,
        employee : (state) => state.employee.employee,
        singleEmployee : (state) => state.employee.singleEmployee,
        departments: (state) => state.department.departments,
        alert: (state) => state.employee.alert,
    }),
    created() {
        //lấy mã nhân viên mới
        if(this.formMode == FormMode.STORE){
            this.setNewEmployeeCode();
        }
        
    },
    mounted(){
        //focus vào input mã nhân viên
        this.$refs.EmployeeCode.focus();
    },
    props: ["isStore"],
    emits: ["isStoreDone"],
    methods: {
        ...mapActions([
            "changeFormMode",
            "toggleDialog",
            "toggleAlert",
            "setNewEmployeeCode",
            "setAlert",
            "addEmployee",
            "editEmployee",
        ]),

        /**
         * chọn nút cất
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        saveData(){
            if(this.formMode==FormMode.STORE_AND_ADD){
                this.changeFormMode(FormMode.STORE);
            }
            if(this.formMode==FormMode.EDIT_AND_ADD){
                this.changeFormMode(FormMode.EDIT);
            }
            this.storeEmployee();
        },

        /**
         * chọn nút cất và thêm
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        saveAddData(){
            if(this.formMode==FormMode.STORE){
                this.changeFormMode(FormMode.STORE_AND_ADD);
            }
            if(this.formMode==FormMode.EDIT){
                this.changeFormMode(FormMode.EDIT_AND_ADD);
            }
            this.storeEmployee();
        },

        /**
         * cất dữ liệu nhân viên
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        storeEmployee(){
            //validate dữ liệu
            let isValid = this.validateData();
            this.employee.Gender = parseInt(document.querySelector('input[name="Gender"]:checked').value);
            
            if (isValid) {
                if (this.formMode == FormMode.STORE ||this.formMode == FormMode.STORE_AND_ADD) {
                    //thêm nhân viên
                    this.addEmployee();
                } else if (this.formMode == FormMode.EDIT ||this.formMode == FormMode.EDIt_AND_ADD) {
                    //sửa nhân viên
                    this.editEmployee();
                }
            }
        },
        
        /**
         * validate dữ liệu
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        validateData(){
            var isValid = true;
            var inputValidates = [];
            // check các input bắt buộc
            var inputRequireds = document.querySelectorAll('.required');
            inputRequireds.forEach(input =>{
                inputValidates.push(input);
                let value = input.value;
                let errorMess = input.nextElementSibling;
                if(!value){
                    input.classList.add('input-error');
                    errorMess.style.display="block";
                    errorMess.title = errorMess.textContent;
                    isValid = false;
                }
                else{
                    input.classList.remove('input-error');
                    errorMess.style.display="none";
                }
            });

            //ngày tháng
            var inputDates = document.querySelectorAll('.input-date');
            var currentDate = (new Date()).toISOString().split('T')[0];
            inputDates.forEach(input => {
                inputValidates.push(input);
                let value = input.value;
                let errorMess = input.nextElementSibling;
                if(value > currentDate){
                    input.classList.add('input-error');
                    errorMess.style.display="block";
                    errorMess.title = errorMess.textContent;
                    isValid = false;
                }
                else{
                    input.classList.remove('input-error');
                    errorMess.style.display="none";
                }
            });

            //kiểm tra đúng định dạng(email)
            var inputEmail = document.querySelector('#email');
            inputValidates.push(inputEmail);
            var mailErrorMess = inputEmail.nextElementSibling;
            var mailValue = inputEmail.value;
            var mailFormat = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+)((\.[a-zA-Z0-9-]{2,3})+)$/;
            if(mailValue){
                if(!mailValue.match(mailFormat)){
                    inputEmail.classList.add('input-error');
                    mailErrorMess.style.display="block";
                    mailErrorMess.title = mailErrorMess.textContent;
                    isValid = false;
                }
                else{
                    inputEmail.classList.remove('input-error');
                    mailErrorMess.style.display="none";
                }
            }
            //hiện dialog lỗi
            for(const input of inputValidates){
                let errorMess = input.nextElementSibling;
                if (errorMess.style.display=="block"){
                    this.setAlert({
                        type:"danger",
                        message: errorMess.textContent,
                    });
                    break;
                }
            }
            return isValid;            
        },

        /**
         * input chọn ngày tháng
         * @param {*} event
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        selectDate(event){
            if(event.target.value){
                this.employee[event.target.name] = new Date(event.target.value).toISOString();
            }
            else {
                this.employee[event.target.name] = null;
            }
        },

        /**
         * combobox chọn phòng ban
         * @param {*} dep
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        selectDepartment(dep){
            this.toggleList();
            this.employee.DepartmentId = dep.DepartmentId;
            this.employee.DepartmentName = dep.DepartmentName;
        },

        /**
         * Ẩn/hiện combobox
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        toggleList(){
            this.isShowList=!this.isShowList;
        },

        /**
         * chọn nút thoát (X) khỏi form
         * @param {*} dep
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        escDialog() {
            // Check dữ liệu trên form đã thay đổi
            if (JSON.stringify(this.employee) !== JSON.stringify(this.singleEmployee)) {
                this.setAlert({
                    type: "question",
                    message: "Dữ liệu đã thay đổi. Bạn có muốn cất không?",
                    action: AlertAction.CONFIRM_STORE,
                });
            } else {
                this.toggleDialog();
            }
        },
        
    },
    watch: {
        isStore(newState) {
            if (newState == true) {
                this.$refs.btnSave.click();
                this.$emit("isStoreDone");
            }
        },
    },
    data() {
        return {
            isShowList: false,
        }
    },
}
</script>