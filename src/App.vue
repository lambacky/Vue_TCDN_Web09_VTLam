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
}
</script>

<style>
@import url(./css/main.css);
</style>
