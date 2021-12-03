<template>
  <div id="app" class="m-flex">
    <the-navbar></the-navbar>
    <div class="main-container">
      <the-header></the-header>
      <router-view/>
    </div>
  </div>
</template>

<script>
// import TheContent from './components/shared/TheContent.vue';
import TheHeader from './components/shared/TheHeader.vue';
import TheNavbar from './components/shared/TheNavbar.vue';
export default {
  name: "App",
  components: {
    TheNavbar,
    TheHeader
  },

};
</script>

<style scoped>
  @import url("./assets/css/main.css");
  .main-container{
    width: calc(100vw - 177px);
  }
</style>
