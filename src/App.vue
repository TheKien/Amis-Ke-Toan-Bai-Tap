<template>
  <div id="app" class="m-flex">
      <TheNavbar />
      <div class="content-area">
        <TheHeader />
        <TheContent />
      </div>
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
.content-area {
  width: calc(100vw - 179px);
}
</style>
