<template>
    <TheSidebar/>
  <div class="main">
    <TheHeader/>
    <TheMainContent/>
  </div>
  <div v-if="isShowLoading" id="loading" class="loading-svg">
        <div class="icon-loading"></div>
  </div>
</template>

<script>
import {  mapState } from 'vuex'
import TheHeader from './components/layouts/TheHeader.vue'
import TheMainContent from './components/layouts/TheMainContent.vue'
import TheSidebar from './components/layouts/TheSidebar.vue'

export default {
  name: 'App',
  components: {
    TheHeader,TheSidebar,TheMainContent
  },
  computed: mapState({
    isShowLoading :(state) =>state.employee.isShowLoading,
  }),
  created() {
    /**
     * Ẩn dropdown khi click bên ngoài
     * Author: Vũ Tùng Lâm (30/10/2022)
     */
    document.addEventListener('click',function(event){
      document.querySelectorAll('.dropdown-list').forEach(dropdownList => {
          if ((event.target!=dropdownList.previousElementSibling)) {
              dropdownList.style.display="none";
          }
      });
    });
  },
}
</script>

<style>
@import url(./css/main.css);
</style>
