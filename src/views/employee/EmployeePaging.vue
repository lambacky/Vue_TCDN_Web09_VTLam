<template>
    <div class="paging">
        <div class="paging-left">
            <div class="record-sum">Tổng số: <b id="totalRecord">{{totalEmployee}}</b> bản ghi</div>
        </div>
        <div class="paging-right">
            <div class="page-limit">
                <div class="combobox">            
                    <input id="pageSize" class="input combobox-input" type="text" :value="filter.pageSize + ' bản ghi trên 1 trang'" readonly>
                    <div class="combobox-button" @click="toggleList">
                        <div class="icon icon-arrow-dropdown"></div>
                    </div>
                    <div id="pageSizeList" class="combobox-data page-size-list" v-if="isShowList">
                        <div v-for="(item,index) in [10,20,30,50,100]" :key="index" class="data-item" :class="{'checked': filter.pageSize == item}" @click="selectPageSize(item)">{{item}} bản ghi trên 1 trang</div>
                    </div>
                </div>
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
export default {
    name:"EmployeePaging",
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
            this.setFilter({
                pageSize: this.filter.pageSize,
                pageNumber: pageNumber,
                employeeFilter: this.filter.employeeFilter
            });
            this.getEmployee();
        },
        /**
         * chọn số lượng bản ghi mỗi trang
         * @param {int} pageSize
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        selectPageSize(pageSize){
            this.toggleList();
            this.setFilter({
                pageSize: pageSize,
                pageNumber: 1,
                employeeFilter: this.filter.employeeFilter
            });
            this.getEmployee();
        },

        /**
         * chọn trang trước
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        selectPrevPage(){
            this.setFilter({
                pageSize: this.filter.pageSize,
                pageNumber: this.filter.pageNumber - 1,
                employeeFilter: this.filter.employeeFilter
            });
            this.getEmployee();
        },

        /**
         * chọn trang sau
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        selectNextPage(){
            this.setFilter({
                pageSize: this.filter.pageSize,
                pageNumber: this.filter.pageNumber + 1,
                employeeFilter: this.filter.employeeFilter
            });
            this.getEmployee();
        },

        /**
         * Ẩn/hiện combobox
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        toggleList(){
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