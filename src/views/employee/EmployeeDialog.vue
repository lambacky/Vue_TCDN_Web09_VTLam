<template>
    <div id="formDialog" class="dialog-wrapper">
        <div class="dialog dialog-add-emp">
            <div class="dialog-header">
                <div class="dialog-header-left">
                    <div id="formTitle" class="dialog-title">{{dialogTitle}}</div>
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
                            <!-- <BaseInput :inputLabel="'Tên'" :inputWidth="'flex-1'" :validateType="'required'" v-model="employee.EmployeeName" :errorMess="errorRequired" tabindex="2" /> -->
                        </div>
                        <input v-model="employee.DepartmentId" id="departmentId" type="hidden" name="DepartmentId">
                        <div class="input-wrapper" style="overflow:visible">
                            <label class="input-label">Đơn vị <span class="require-mark">*</span></label>
                            <div class="combobox">
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
                                <input ref="DateOfBirth" v-model="employee.DateOfBirth" id="dateOfBirth" type="date" class="input input-date" name="DateOfBirth" tabindex="3">
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
                                <input ref="IdentityDate" v-model="employee.IdentityDate" id="identityDate" type="date" class="input input-date" name="IdentityDate" tabindex="9">
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
                <BaseButton :btnText="'Hủy'" :isSecondary="true" @click="toggleDialog" tabindex="21"/>
                <div class="btn-action">
                    <BaseButton :btnText="'Cất'" :isSecondary="true" @click="saveData" tabindex="20"/>
                    <BaseButton :btnText="'Cất và thêm'" @click="saveAddData" tabindex="19"/>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
import FormMode from "../../enums/formMode.js"
import AlertAction from "../../enums/alertAction.js"
import BaseButton from "../../components/base/BaseButton.vue"
// import BaseInput from "../../components/base/BaseInput.vue"
export default {
    name:"EmployeeDialog",
    components:{BaseButton},
    computed: mapState({
        isShowDialog: (state) => state.employee.isShowDialog,
        formMode: (state) => state.employee.formMode,
        employee : (state) => state.employee.employee,
        singleEmployee : (state) => state.employee.singleEmployee,
        departments: (state) => state.department.departments,
        alert: (state) => state.employee.alert,
        dialogTitle: (state) => state.employee.dialogTitle
    }),
    created() {
        const me=this;
        //lấy mã nhân viên mới
        if(me.formMode == FormMode.STORE){
            me.setNewEmployeeCode();
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
            const me=this;
            if(me.formMode==FormMode.STORE_AND_ADD){
                me.changeFormMode(FormMode.STORE);
            }
            if(me.formMode==FormMode.EDIT_AND_ADD){
                me.changeFormMode(FormMode.EDIT);
            }
            me.storeEmployee();
        },

        // saveData(){
        //     const me=this;
        //     if(!me.employee.EmployeeName){
        //         me.errorRequired = 'required';
        //         me.setAlert({
        //             type:"danger",
        //             message: me.errorRequired,
        //         });
                
        //     }else{
        //         me.errorRequired = null;
        //         console.log(me.employee.EmployeeName);
        //     }
        // },

        /**
         * chọn nút cất và thêm
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        saveAddData(){
            const me=this;
            if(me.formMode==FormMode.STORE){
                me.changeFormMode(FormMode.STORE_AND_ADD);
            }
            if(me.formMode==FormMode.EDIT){
                me.changeFormMode(FormMode.EDIT_AND_ADD);
            }
            me.storeEmployee();
        },

        /**
         * cất dữ liệu nhân viên
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        storeEmployee(){
            const me=this;
            //validate dữ liệu
            let isValid = me.validateData();
            me.employee.Gender = parseInt(document.querySelector('input[name="Gender"]:checked').value);
            
            if (isValid) {
                if (me.formMode == FormMode.STORE ||me.formMode == FormMode.STORE_AND_ADD) {
                    //thêm nhân viên
                    me.addEmployee();
                } else if (me.formMode == FormMode.EDIT ||me.formMode == FormMode.EDIt_AND_ADD) {
                    //sửa nhân viên
                    me.editEmployee();
                }
            }
        },
        
        /**
         * validate dữ liệu
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        validateData(){
            const me=this;
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
                    me.setAlert({
                        type:"danger",
                        message: errorMess.textContent,
                    });
                    break;
                }
            }
            return isValid;            
        },

        /**
         * combobox chọn phòng ban
         * @param {*} dep
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        selectDepartment(dep){
            const me=this;
            me.toggleList();
            me.employee.DepartmentId = dep.DepartmentId;
            me.employee.DepartmentName = dep.DepartmentName;
        },

        /**
         * Ẩn/hiện combobox
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        toggleList(){
            const me=this;
            me.isShowList=!me.isShowList;
        },

        /**
         * chọn nút thoát (X) khỏi form
         * @param {*} dep
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        escDialog() {
            const me=this;
            // Check dữ liệu trên form đã thay đổi
            if (JSON.stringify(me.employee) !== JSON.stringify(me.singleEmployee)) {
                me.setAlert({
                    type: "question",
                    message: "Dữ liệu đã thay đổi. Bạn có muốn cất không?",
                    action: AlertAction.CONFIRM_STORE,
                });
            } else {
                me.toggleDialog();
            }
        },
        
    },
    watch: {
        isStore(newState) {
            const me=this;
            if (newState == true) {
                me.saveData();
                me.$emit("isStoreDone");
            }
        },
    },
    data() {
        return {
            isShowList: false,
            errorRequired:null
        }
    },
}
</script>