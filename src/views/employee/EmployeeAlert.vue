<template>
    <!-- <div class="dialog-wrapper alert">
        <div class="dialog alert-dialog">
            <div class="dialog-body alert-body">
                <div v-if="alert.type=='warning'" class="icon icon-warning"></div>
                <div v-if="alert.type=='danger'" class="icon icon-danger"></div>
                <div v-if="alert.type=='question'" class="icon icon-question"></div>
                <div v-if="alert.type=='success'" class="icon icon-success"></div>

                <div class="content-message">{{alert.message}}</div>
            </div>

            <div v-if="alert.type=='warning'" class="dialog-footer alert-warning-delete-footer">
                <BaseButton :btnText="Text.deny" :isSecondary="true" @click="toggleAlert" tabIndex="2" />
                <BaseButton :btnText="Text.confirm" @click="confirmClick" tabIndex="1" />
            </div>

            <div v-if="alert.type=='danger'||alert.type=='success'" class="dialog-footer alert-danger-footer">
                <BaseButton :btnText="Text.close" @click="toggleAlert" tabIndex="1" />
            </div>

            <div v-if="alert.type=='question'" class="dialog-footer alert-question-footer">
                <BaseButton :btnText="Text.cancel" :isSecondary="true" @click="toggleAlert" tabIndex="3" />
                <div class="btn-action">
                    <BaseButton :btnText="Text.deny" :isSecondary="true" @click="closeAll" tabIndex="2" />
                    <BaseButton :btnText="Text.confirm" @click="confirmClick" tabIndex="1" />
                </div>
            </div>
        </div>
    </div> -->
    <BaseAlert :alert="alert" @confirmClick="confirmClick" @closeAll="closeAll"/>
</template>

<script>
import AlertAction from '@/enums/alertAction';
import { mapGetters, mapActions } from 'vuex'
import BaseAlert from '../../components/base/BaseAlert.vue'
export default {
    name:"EmployeeAlert",
    components:{BaseAlert},
    computed: mapGetters(["alert"]),
    emits: ["setIsStore"],
    methods: {
        ...mapActions([
            "toggleAlert",
            "deleteEmployee",
            "deleteBatchEmployee",
            "getEmployee",
            "toggleDialog",
        ]),

        /**
         * xác nhận cất hoặc xóa nhân viên
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        confirmClick(){
            const me=this;
            if(me.alert.action==AlertAction.CONFIRM_STORE){
                me.$emit("setIsStore");
            }
            if(me.alert.action==AlertAction.CONFIRM_DELETE){
                 me.deleteEmployee();
            }
            if(me.alert.action==AlertAction.CONFIRM_DELETE_BATCH){
                 me.deleteBatchEmployee();
            }
        },

        /**
         * chọn không xóa nhân viện
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        closeAll(){
            const me = this;
            me.toggleDialog();
        }
    },
}
</script>