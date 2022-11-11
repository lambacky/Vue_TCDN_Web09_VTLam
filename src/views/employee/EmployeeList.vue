<template>
    <div class="main-content">
        <div class="content-header">
            <div class="content-title">Nhân viên</div>
            <BaseButton :btnText="'Thêm mới nhân viên'" @click="openForm"/>
        </div>
        
        <div class="content-body">
            <div class="toolbar">
                <div class="toolbar-left">
                    <BaseButton :btnText="'Xóa'" :isDisabled="checkedEmployeeIds.length==0" @click="deleteBatch"/>
                </div>
                <div class="toolbar-right">
                    <div class="search-area">
                        <BaseInput @keyup="searchEmployee" v-model="filter.employeeFilter" :placeHolder="'Tìm theo mã, tên nhân viên'" :icon="'icon-search'"/>
                    </div>
                    <button @click="refreshTable" id="btnRefresh" class="icon btn-refresh icon-refresh"></button>
                </div>
            </div>

            <EmployeeTable />

            <EmployeePaging />
            
            
        </div>
    </div>

    <!-- FORM DIALOG -->
    <EmployeeDialog v-if="isShowDialog" :isStore="isStore"
      @isStoreDone="() => (this.isStore = false)"/>

    <EmployeeAlert v-if="isShowAlert" @setIsStore="() => (this.isStore = true)"/>
</template>

<script>

import  FormMode  from "../../enums/formMode.js"
import Gender from "../../enums/gender.js"
import AlertAction from "../../enums/alertAction.js"
import { mapActions, mapState } from "vuex"
import EmployeeDialog from './EmployeeDialog.vue'
import EmployeeTable from './EmployeeTable.vue'
import EmployeePaging from './EmployeePaging.vue'
import EmployeeAlert from './EmployeeAlert.vue'
import BaseButton from '../../components/base/BaseButton.vue'
import BaseInput from '../../components/base/BaseInput.vue'
export default {
    name:"EmployeeList",
    components:{EmployeeTable, EmployeePaging, EmployeeDialog, EmployeeAlert,BaseButton,BaseInput},
    props:[],
    computed: mapState({
        isShowDialog: (state) => state.employee.isShowDialog,
        isShowAlert: (state) => state.employee.isShowAlert,
        filter: (state) => state.employee.filter,
        dialogTitle: (state) => state.employee.dialogTitle,
        checkedEmployeeIds: (state) => state.employee.checkedEmployeeIds,
    }),
    created() {
        const me = this;
        //load dữ liệu nhân viên và phòng ban
        me.toggleLoading();
        me.getEmployee();
        me.getDepartment();
    },
    methods:{
        ...mapActions([
            "changeFormMode",
            "toggleDialog",
            "toggleLoading",
            "getEmployee",
            "getDepartment",
            "selectEmployee",
            "setFilter",
            "setDialogTitle",
            "setAlert"
        ]),
        
        /**
         * Mở form nhân viên
         * Author:Vũ Tùng Lâm (30/10/2022)
         */
        openForm(){
            const me = this;
            me.setDialogTitle("Thêm khách hàng");
            me.selectEmployee({ Gender: Gender.MALE });
            me.changeFormMode(FormMode.STORE);
            me.toggleDialog();            
        },

        /**
         * Tìm kiếm nhân viên
         * Author:Vũ Tùng Lâm (30/10/2022)
         */
        searchEmployee(){
            const me = this;
            me.setFilter({
                pageSize: me.filter.pageSize,
                pageNumber: 1,
                employeeFilter: me.filter.employeeFilter
            });
            me.getEmployee();
        },

        /**
         * refresh dữ liệu danh sách nhân viên
         * Author:Vũ Tùng Lâm (30/10/2022)
         */
        refreshTable(){
            const me = this;
            me.setFilter({
                pageSize: me.filter.pageSize,
                pageNumber: 1,
                employeeFilter: ""
            });
            me.getEmployee();
        },

        /**
         * Xóa hàng loạt
         * Author:Vũ Tùng Lâm (30/10/2022)
         */
        deleteBatch(){
            const me=this;
            me.setAlert({
                type:"warning",
                message: `Bạn có thực sự muốn xóa những nhân viên này không?`,
                action: AlertAction.CONFIRM_DELETE_BATCH
            });
        }
    },
    data() {
        return {
            isStore: false,
        };
    },
    
}
</script>