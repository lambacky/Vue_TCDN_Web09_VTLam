<template>
    <div class="combobox">            
        <input class="input combobox-input" type="text" :value="selectedItem" readonly>
        <div class="combobox-button" @click="toggleList">
            <div class="icon icon-arrow-dropdown"></div>
        </div>
        <div class="combobox-data" :class="className" v-if="isShowList">
            <div v-for="(item,index) in dataList" :key="index" class="data-item" :class="{'checked': selectedItem == item}" @click="emitItem(item)">{{className=='department-list' ? item.DepartmentName : item}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"BaseCombobox",
    props:["selectedItem","className","dataList"],
    emits:["selectAction"],
    methods: {
        /**
         * Ẩn/hiện combobox
         * Author: Vũ Tùng Lâm (30/10/2022)
         */
        toggleList(){
            const me=this;
            me.isShowList=!me.isShowList;
        },
        
        /**
         * trả item được chọn
         * @param {*} item
         * Author:Vũ Tùng Lâm (2/11/2022)
         */
        emitItem(item){
            const me=this;
            me.toggleList();
            me.$emit("selectAction",item);
        }
    },
    data() {
        return {
            isShowList: false
        }
    },
}
</script>