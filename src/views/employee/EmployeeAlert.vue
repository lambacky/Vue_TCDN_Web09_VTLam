<template>

    <div class="dialog-wrapper alert">
        <div class="dialog alert-dialog">
            <div class="dialog-body alert-body">
                <div v-if="alert.type=='warning'" class="icon icon-warning"></div>
                <div v-if="alert.type=='danger'" class="icon icon-danger"></div>
                <div v-if="alert.type=='question'" class="icon icon-question"></div>
                <div v-if="alert.type=='success'" class="icon icon-success"></div>

                <div class="content-message">{{alert.message}}</div>
            </div>

            <div v-if="alert.type=='warning'" class="dialog-footer alert-warning-delete-footer">
                <button @click="toggleAlert" class="btn btn-secondary btn-close" tabindex="2">Không</button>
                <button @click="confirmDelete" class="btn btn-confirm" tabindex="1">Có</button>
            </div>

            <div v-if="alert.type=='danger'||alert.type=='success'" class="dialog-footer alert-danger-footer">
                <button @click="toggleAlert" class="btn btn-close" tabindex="1">Đóng</button>
            </div>

            <div v-if="alert.type=='question'" class="dialog-footer alert-question-footer">
                <button @click="toggleAlert" class="btn btn-secondary btn-close" tabindex="3">Hủy</button>
                <div class="btn-action">
                    <button @click="closeAll" class="btn btn-secondary btn-deny" tabindex="2">Không</button>
                    <button @click="confirmStore" class="btn btn-confirm" tabindex="1">Có</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name:"EmployeeAlert",
    computed: mapState({
        alert: (state) => state.employee.alert,
        singleEmployee: (state) => state.employee.singleEmployee,
    }),
    emits: ["setIsStore"],
    methods: {
        ...mapActions([
            "toggleAlert",
            "deleteEmployee",
            "getEmployee",
            "toggleDialog",
        ]),

        /**
         * xác nhận cất nhân viên
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        confirmStore(){
            this.toggleAlert();
            this.$emit("setIsStore");
        },

        /**
         * xác nhận xóa nhân viên
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        confirmDelete(){
            this.toggleAlert();
            this.deleteEmployee(this.singleEmployee.EmployeeId);
        },

        /**
         * chọn không xóa nhân viện
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        closeAll(){
            this.toggleAlert();
            this.toggleDialog();
        }
    },
}
</script>