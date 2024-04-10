<template>
  <div class="all-movies-component">
    <div v-for="movie in movies" :key="movie.imdbID">
      <movie-card v-bind:movie="movie"></movie-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MovieCard from "./MovieCard.vue";
export default {
  data() {
    return {
      movies: [],
    };
  },
  components: {
    "movie-card": MovieCard,
  },
  methods: {
    getNextMovies() {
      var year = parseInt(new Date().getFullYear());
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          year--;
          axios
            .get(`https://www.omdbapi.com/?s=all&y=${year}&apikey=fd9ff0fe`)
            .then((response) => {
              console.log(response.data.Search);
              console.log(year);
              this.movies.push(...response.data.Search);
            })
            .catch((error) => console.log(error));
        }
      };
    },
    getInitialMovies() {
      let year = parseInt(new Date().getFullYear());
      this.$store.commit("searchedMovieString", null);
      axios
        .get(`https://www.omdbapi.com/?s=all&y=${year}&apikey=fd9ff0fe`)
        .then((response) => {
          console.log(year);
          this.movies = response.data.Search;
        })
        .catch((error) => console.log(error));
    },
  },
  beforeMount() {
    this.getInitialMovies();
  },
  mounted() {
    this.getNextMovies();
  },
};
</script>

<style lang="less" scoped>
.all-movies-component {
  display: grid;
  grid-template-columns: auto auto auto auto;
}
</style>
