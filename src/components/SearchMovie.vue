<template>
  <input
    placeholder="Search..."
    v-model="search"
    v-on:keyup.enter="searchForMovie"
  />
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  methods: {
    searchForMovie() {
      this.search = this.search.trim();
      if (this.search != "") {
        this.$store.commit("searchedMovieString", this.search);
        this.$router.push(`/browse`);
      }
      this.search = "";
    },
  },
};
</script>

<style lang="less" scoped>
input {
  height: 20px;
  margin-top: 32px;
  padding: 10px;
  font-size: 20px;
}
input:hover,
input:active {
  border-color: white;
}
</style>
