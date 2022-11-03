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
                <BaseButton :btnText="'Không'" :isSecondary="true" @click="toggleAlert" tabindex="2" />
                <BaseButton :btnText="'Có'" @click="confirmDelete" tabindex="1" />
            </div>

            <div v-if="alert.type=='danger'||alert.type=='success'" class="dialog-footer alert-danger-footer">
                <button @click="toggleAlert" class="btn btn-close" tabindex="1">Đóng</button>
            </div>

            <div v-if="alert.type=='question'" class="dialog-footer alert-question-footer">
                <BaseButton :btnText="'Hủy'" :isSecondary="true" @click="toggleAlert" tabindex="3" />
                <div class="btn-action">
                    <BaseButton :btnText="'Không'" :isSecondary="true" @click="closeAll" tabindex="2" />
                    <BaseButton :btnText="'Có'" @click="confirmStore" tabindex="1" />
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BaseButton from '../../components/base/BaseButton.vue'
export default {
    name:"EmployeeAlert",
    components:{BaseButton},
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
            const me = this;
            me.toggleAlert();
            me.$emit("setIsStore");
        },

        /**
         * xác nhận xóa nhân viên
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        confirmDelete(){
            const me = this;
            me.toggleAlert();
            me.deleteEmployee(me.singleEmployee.EmployeeId);
        },

        /**
         * chọn không xóa nhân viện
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        closeAll(){
            const me = this;
            me.toggleAlert();
            me.toggleDialog();
        }
    },
}
</script>