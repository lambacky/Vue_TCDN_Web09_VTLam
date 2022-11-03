<template>
    <div class="paging">
        <div class="paging-left">
            <div class="record-sum">Tổng số: <b id="totalRecord">{{totalEmployee}}</b> bản ghi</div>
        </div>
        <div class="paging-right">
            <div class="page-limit">
                <BaseCombobox :dataList="[
                        '10 bản ghi trên 1 trang',
                        '20 bản ghi trên 1 trang',
                        '30 bản ghi trên 1 trang',
                        '50 bản ghi trên 1 trang',
                        '100 bản ghi trên 1 trang',
                        ]" :className="'page-size-list'" :selectedItem="filter.pageSize + ' bản ghi trên 1 trang'" @selectAction="selectPageSize"/>
            </div> 
            <div class="page-button">
                <button :disabled="filter.pageNumber==1" class="btn-prev" @click="selectPrevPage">Trước</button>
                <div id="totalPage" class="total-page" data-currentpage="1">
                    <div v-for="(page,index) in totalPage" :key="index" class="page-number" :class="{ 'selected': filter.pageNumber == page }" @click="selectPageNumber(page)">{{page}}</div>
                </div>
                <button :disabled="filter.pageNumber==totalPage" class="btn-next" @click="selectNextPage">Sau</button>
            </div>                  
        </div>
    </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import BaseCombobox from '../../components/base/BaseCombobox.vue'
export default {
    name:"EmployeePaging",
    components:{BaseCombobox},
    computed: mapState({
        totalEmployee: (state) => state.employee.totalEmployee,
        totalPage :(state) => state.employee.totalPage,
        filter: (state) => state.employee.filter,
    }),
    methods: {
        ...mapActions(["setFilter", "getEmployee"]),

        /**
         * chọn số trang
         * @param {int} pageNumber
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        selectPageNumber(pageNumber){
            const me = this;
            me.setFilter({
                pageSize: me.filter.pageSize,
                pageNumber: pageNumber,
                employeeFilter: me.filter.employeeFilter
            });
            me.getEmployee();
        },
        /**
         * chọn số lượng bản ghi mỗi trang
         * @param {int} pageSize
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        selectPageSize(pageSize){
            pageSize = pageSize.split(' ')[0];
            const me = this;
            me.setFilter({
                pageSize: pageSize,
                pageNumber: 1,
                employeeFilter: me.filter.employeeFilter
            });
            me.getEmployee();
        },

        /**
         * chọn trang trước
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        selectPrevPage(){
            const me = this;
            me.setFilter({
                pageSize: me.filter.pageSize,
                pageNumber: me.filter.pageNumber - 1,
                employeeFilter: me.filter.employeeFilter
            });
            me.getEmployee();
        },

        /**
         * chọn trang sau
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        selectNextPage(){
            const me = this;
            me.setFilter({
                pageSize: me.filter.pageSize,
                pageNumber: me.filter.pageNumber + 1,
                employeeFilter: me.filter.employeeFilter
            });
            me.getEmployee();
        },
    },
}
</script>