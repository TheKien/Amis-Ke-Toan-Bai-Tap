<template>
  <div id="app">
    <TheNavbar />
    <TheHeader />
    <TheContent />
  </div>
</template>

<script>
import TheContent from "./components/shared/TheContent.vue";
import TheHeader from "./components/shared/TheHeader.vue";
import TheNavbar from "./components/shared/TheNavbar.vue";
export default {
  name: "App",
  components: {
    TheNavbar,
    TheHeader,
    TheContent,
  },
};
</script>

<style scoped>
@import url("./assets/css/main.css");
</style>
