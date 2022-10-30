<template>
    <div class="main-content">
        <div class="content-header">
            <div class="content-title">Nhân viên</div>
            <button id="btnAddEmployee" class="btn btn-add-emp" @click="openForm">Thêm mới nhân viên</button>
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
export default {
    name:"EmployeeList",
    components:{EmployeeTable, EmployeePaging, EmployeeDialog, EmployeeAlert},
    props:[],
    computed: mapState({
        isShowDialog: (state) => state.employee.isShowDialog,
        isShowAlert: (state) => state.employee.isShowAlert,
        filter: (state) => state.employee.filter,
    }),
    created() {
        //load dữ liệu nhân viên và phòng ban
        this.getEmployee();
        this.getDepartment();
    },
    methods:{
        ...mapActions([
            "changeFormMode",
            "toggleDialog",
            "getEmployee",
            "getDepartment",
            "selectEmployee",
            "setFilter",
        ]),
        
        /**
         * Mở form nhân viên
         * Author:Vũ Tùng Lâm (30/10/2022)
         */
        openForm(){
            this.selectEmployee({ Gender: Gender.MALE });
            this.changeFormMode(FormMode.STORE);
            this.toggleDialog();            
        },

        /**
         * Tìm kiếm nhân viên
         * Author:Vũ Tùng Lâm (30/10/2022)
         */
        searchEmployee(){
            this.setFilter({
                pageSize: this.filter.pageSize,
                pageNumber: 1,
                employeeFilter: this.$refs.inputSearch.value
            });
            this.getEmployee();
        },

        /**
         * refresh dữ liệu danh sách nhân viên
         * Author:Vũ Tùng Lâm (30/10/2022)
         */
        refreshTable(){
            this.$refs.inputSearch.value="";
            this.setFilter({
                pageSize: this.filter.pageSize,
                pageNumber: 1,
                employeeFilter: ""
            });
            this.getEmployee();
        }
    },
    data() {
        return {
            isStore: false,
        };
    },
    
}
</script>