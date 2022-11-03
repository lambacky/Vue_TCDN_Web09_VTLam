<template>
    <div class="main-content">
        <div class="content-header">
            <div class="content-title">Nhân viên</div>
            <BaseButton :btnText="'Thêm mới nhân viên'" @click="openForm" />
        </div>
        
        <div class="content-body">
            <div class="toolbar">
                <div class="toolbar-left">
                    <button id="btnDelete" class="btn btn-delete" disabled>Xóa</button>
                </div>
                <div class="toolbar-right">
                    <div class="search-area">
                        <input @keyup="searchEmployee" ref="inputSearch" id="inputSearch" type="text" class="input input-search search-emp" placeholder="Tìm theo mã, tên nhân viên" />
                        <div class="icon icon-search"></div>
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
import { mapActions, mapState } from "vuex"
import EmployeeDialog from './EmployeeDialog.vue'
import EmployeeTable from './EmployeeTable.vue'
import EmployeePaging from './EmployeePaging.vue'
import EmployeeAlert from './EmployeeAlert.vue'
import BaseButton from '../../components/base/BaseButton.vue'
export default {
    name:"EmployeeList",
    components:{EmployeeTable, EmployeePaging, EmployeeDialog, EmployeeAlert,BaseButton},
    props:[],
    computed: mapState({
        isShowDialog: (state) => state.employee.isShowDialog,
        isShowAlert: (state) => state.employee.isShowAlert,
        filter: (state) => state.employee.filter,
        dialogTitle: (state) => state.employee.dialogTitle
    }),
    created() {
        const me = this;
        //load dữ liệu nhân viên và phòng ban
        me.getEmployee();
        me.getDepartment();
    },
    methods:{
        ...mapActions([
            "changeFormMode",
            "toggleDialog",
            "getEmployee",
            "getDepartment",
            "selectEmployee",
            "setFilter",
            "setDialogTitle"
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
                employeeFilter: me.$refs.inputSearch.value
            });
            me.getEmployee();
        },

        /**
         * refresh dữ liệu danh sách nhân viên
         * Author:Vũ Tùng Lâm (30/10/2022)
         */
        refreshTable(){
            const me = this;
            me.$refs.inputSearch.value="";
            me.setFilter({
                pageSize: me.filter.pageSize,
                pageNumber: 1,
                employeeFilter: ""
            });
            me.getEmployee();
        }
    },
    data() {
        return {
            isStore: false,
        };
    },
    
}
</script>