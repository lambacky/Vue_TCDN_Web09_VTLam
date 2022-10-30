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
                    <div id="btnEsc" class="icon icon-close" title="Thoát"></div>
                </div>
            </div>
            <form id="employeeForm" class="dialog-body">
                <div class="dialog-body-top">
                    <div class="dialog-body-left w-50">
                        <div class="row-flex">
                            <div class="input-wrapper w-40" >
                                <label class="input-label">Mã <span class="require-mark">*</span></label>
                                <input v-model="employee.EmployeeCode" id="employeeCode" type="text" required class="required input" name="EmployeeCode" tabindex="1">
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
                                <div class="combobox-button" @click="toggle">
                                    <div class="icon icon-arrow-dropdown"></div>
                                </div>
                                <div v-if="isShowList" id="departmentList" class="combobox-data department-list">
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
                                <input :value="employee.DateOfBirth? employee.DateOfBirth.split('T')[0] : null" id="dateOfBirth" type="date" class="input input-date" name="DateOfBirth" tabindex="3">
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
                                <input :value="employee.IndentiyDate? employee.IdentityDate.split('T')[0] :null" id="identityDate" type="date" class="input input-date" name="IdentityDate" tabindex="9">
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
                <button class="btn btn-secondary btn-close" tabindex="21" @click="closeDialog">Hủy</button>
                <div class="btn-action">
                    <button id="btnSave" class="btn btn-secondary btn-store" tabindex="20">Cất</button>
                    <button id="btnSaveAdd" class="btn btn-store-add" tabindex="19">Cất và thêm</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import FormMode from "../../enums/formMode.js"
export default {
    name:"EmployeeDialog",
    computed: mapState({
        isShowDialog: (state) => state.employee.isShowDialog,
        formMode: (state) => state.employee.formMode,
        employee : (state) => state.employee.employee,
    }),
    created() {
        if(this.formMode == FormMode.STORE){
            this.setNewEmployeeCode();
        }
    },
    methods: {
        ...mapActions([
            "changeFormMode",
            "toggleDialog",
            "setNewEmployeeCode",
        ]),
        closeDialog(){
            this.toggleDialog();
        },
        toggle(){
            this.isShowList=!this.isShowList;
        },
    },
    data() {
        return {
            isShowList: false,
        }
    },
}
</script>