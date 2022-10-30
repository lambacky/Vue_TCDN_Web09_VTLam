<template>

    <div class="dialog-wrapper alert">
        <div class="dialog alert-dialog">
            <div class="dialog-body alert-body">
                <div v-if="alert.type=='warning'" class="icon icon-warning"></div>
                <div v-if="alert.type=='danger'" class="icon icon-danger"></div>
                <div v-if="alert.type=='question'" class="icon icon-question"></div>
                <div v-if="alert.type=='sucess'" class="icon icon-success"></div>

                <div class="content-message">{{alert.message}}</div>
            </div>

            <div v-if="alert.type=='warning'" class="dialog-footer alert-warning-delete-footer">
                <button @click="toggleAlert" class="btn btn-secondary btn-close" tabindex="2">Không</button>
                <button class="btn btn-confirm" tabindex="1">Có</button>
            </div>

            <div v-if="alert.type=='danger'||alert.type=='success'" class="dialog-footer alert-danger-footer">
                <button class="btn btn-close" tabindex="1">Đóng</button>
            </div>

            <div v-if="alert.type=='question'" class="dialog-footer alert-question-footer">
                <button class="btn btn-secondary btn-close" tabindex="3">Hủy</button>
                <div class="btn-action">
                    <button class="btn btn-secondary btn-deny" tabindex="2">Không</button>
                    <button class="btn btn-confirm" tabindex="1">Có</button>
                </div>
            </div>

        </div>
    </div>

    <!-- <div class="dialog-wrapper alert alert-warning-delete">
        <div class="dialog alert-dialog">
            <div class="dialog-body alert-body">
                <div class="icon icon-warning"></div>
                <div class="content-message">{{alert.message}}</div>
            </div>
            <div class="dialog-footer alert-warning-delete-footer">
                <button @click="toggleAlert" class="btn btn-secondary btn-close" tabindex="2">Không</button>
                <button class="btn btn-confirm" tabindex="1">Có</button>
            </div>
        </div>
    </div> -->

    <!-- <div class="dialog-wrapper alert alert-danger">
        <div class="dialog alert-dialog">
            <div class="dialog-body alert-body">
                <div class="icon icon-danger"></div>
                <div class="content-message"></div>
            </div>
            <div class="dialog-footer alert-danger-footer">
                <button class="btn btn-close" tabindex="1">Đóng</button>
            </div>
        </div>
    </div>

    <div class="dialog-wrapper alert alert-question">
        <div class="dialog alert-dialog">
            <div class="dialog-body alert-body">
                <div class="icon icon-question"></div>
                <div class="content-message">Dữ liệu đã bị thay đổi. Bạn muốn cất không?</div>
            </div>
            <div class="dialog-footer alert-question-footer">
                <button class="btn btn-secondary btn-close" tabindex="3">Hủy</button>
                <div class="btn-action">
                    <button class="btn btn-secondary btn-deny" tabindex="2">Không</button>
                    <button class="btn btn-confirm" tabindex="1">Có</button>
                </div>
            </div>
        </div>
    </div>

    <div class="dialog-wrapper alert alert-success">
        <div class="dialog alert-dialog">
            <div class="dialog-body alert-body">
                <div class="icon icon-success"></div>
                <div class="content-message"></div>
            </div>
            <div class="dialog-footer alert-success-footer">
                <button class="btn btn-close" tabindex="1">Đóng</button>
            </div>
        </div>
    </div> -->
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name:"EmployeeAlert",
    computed: mapState({
        alert: (state) => state.employee.alert
    }),

    methods: {
        ...mapActions([
            "toggleAlert"
        ]),
    },
}
</script>