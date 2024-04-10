<template>
  <app-header :isBrowse="isBrowse"></app-header>
  <router-view></router-view>
</template>

<script>
import AppHeader from "./components/header/Header.vue";
export default {
  name: "App",
  watch: {
    isBrowse() {
      this.checkBrowseRoute(this.$route.fullPath);
    },
  },
  computed: {
    isBrowse() {
      return this.checkBrowseRoute(this.$route.fullPath);
    },
  },
  methods: {
    checkBrowseRoute(fullPath) {
      return !fullPath.toString().includes("browse");
    },
  },
  components: {
    "app-header": AppHeader,
  },
};
</script>

<style lang="less">
* {
  background: #000;
  color: antiquewhite;
}
</style>
