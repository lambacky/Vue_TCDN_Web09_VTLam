<template>
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>
                        <input @change="checkAll" id="checkboxAll" class="input-checkbox" type="checkbox">
                    </th>
                    <th v-for="(header,index) in headers" :key="index" :class="header.class" :style="{'min-width':header.minWidth}" :title="header.title" >{{header.name}}</th>
                    <th class="function" style="min-width:120px">{{Text.function}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data,index) in dataList" :key="index" @dblclick="modifyForm(data)">
                    <td @dblclick.stop>
                        <input @change="checkOne(data)" class="input-checkbox" type="checkbox">
                    </td>
                    <td v-for="(value,index) in mapData(data)" :key="index">{{value}}</td>
                    <td @dblclick.stop :style="{'z-index': dataList.length-index}">
                        <div class="table-function">
                            <div class="modify" @click="modifyForm(data)">{{Text.modify}}</div>
                            <div class="dropdown context-menu">
                                <div class="icon dropdown-button icon-arrow-down-blue" @click="toggleList"></div>
                                <div class="dropdown-list">
                                    <div @click="selectDuplicate(data)" class="dropdown-item">{{Text.duplicate}}</div>
                                    <div @click="selectDelete(data)" class="dropdown-item delete-item">{{Text.delete}}</div>
                                    <div class="dropdown-item">{{Text.stopUsing}}</div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import resourceVN from "../../resources/resourceVN"
export default {
    name:"BaseTable",
    props:["headers","dataList","mapData"],
    emits:["modifyForm","selectDuplicate","selectDelete","checkAll","checkOne"],
    methods:{
        /**
         * chỉnh sửa dữ liệu
         * @param {*} data
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        modifyForm(data){
            this.$emit("modifyForm",data);
        },

        /**
         * chọn nhân bản
         * @param {*} data
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        selectDuplicate(data){
            this.$emit("selectDuplicate",data);
        },

        /**
         * chọn xóa dữ liệu
         * @param {*} data
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        selectDelete(data){
            this.$emit("selectDelete",data);
        },

        /**
         * check tất cả checkbox
         * @param {*} event
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        checkAll(event){
            let checkboxes = document.querySelectorAll("tbody input");
            checkboxes.forEach(checkbox=>{checkbox.checked=event.target.checked});
            this.$emit("checkAll",event);
        },

        /**
         * check từng checkbox
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        checkOne(data){
            document.querySelector('#checkboxAll').checked = (document.querySelectorAll("tbody input:checked").length==document.querySelectorAll("tbody input").length);
            this.$emit("checkOne",data);
        },

        /**
         * Ẩn/hiện dropdown
         * @param {*} event
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        toggleList(event){
            let dropdownList = event.target.nextElementSibling;
            if(dropdownList.style.display=="block"){
                dropdownList.style.display="none";
            }else{
                dropdownList.style.display="block";
            }
        },
    },
    mounted(){
        /**
         * Ẩn dropdown khi click bên ngoài
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        document.addEventListener('click',function(event){
            document.querySelectorAll(".dropdown-list").forEach(item => {
                if ((event.target!=item.previousElementSibling)) {
                    item.style.display="none";
                }
            });
        });
    },
    data() {
        return {
            Text:resourceVN.Text
        }
    },
}
</script>