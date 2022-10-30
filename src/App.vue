<template>
    <TheSidebar/>
  <div class="main">
    <TheHeader/>
    <TheMainContent/>
  </div>
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue'
import TheMainContent from './components/layouts/TheMainContent.vue'
import TheSidebar from './components/layouts/TheSidebar.vue'

export default {
  name: 'App',
  components: {
    TheHeader,TheSidebar,TheMainContent
  }
}
</script>

<style>
@import url(./css/main.css);
</style>
