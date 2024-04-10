<template>
  <header>
    <router-link to="/">
      <img alt="Binge Karo" src="../../assets/logo.jpg" />
    </router-link>
    <router-link to="/browse">
      <div class="browse-text">Browse</div>
    </router-link>
    <search-movie v-show="isBrowse"></search-movie>
  </header>
</template>

<script>
import SearchMovie from "../SearchMovie.vue";
export default {
  props: {
    isBrowse: null,
  },
  components: {
    "search-movie": SearchMovie,
  },
};
</script>

<style lang="less" scoped>
header {
  display: grid;
  grid-template-columns: 35% 42% 20%;
  a {
    text-decoration: none;
    cursor: default;
    .browse-text {
      margin-top: 22px;
      text-align: left;
      cursor: pointer;
      padding: 10px 20px;
      font-size: 28px;
      font-weight: 600;
      display: inline-block;
    }
    img {
      cursor: pointer;
    }
    &.router-link-exact-active {
      .browse-text {
        text-decoration: underline;
      }
    }
  }
}
</style>
