<template>
  <div class="search-section">
    <h2 class="search-text">Browse for movies </h2>
    <search-movie class="search-movie"></search-movie>
  </div>
  <div class="filters">
    <input
      type="radio"
      id="radio-movie"
      name="type"
      v-model="type"
      value="movie"
    />
    <label for="radio-movie">Movies</label>
    <input
      type="radio"
      id="radio-series"
      name="type"
      v-model="type"
      value="series"
    />
    <label for="radio-series">Series</label>
    <input
      type="radio"
      id="radio-episode"
      name="type"
      v-model="type"
      value="episode"
    />
    <label for="radio-episode">Episode</label>
  </div>
  <div class="count-result" v-if="typeof movies == 'object'">
    Found {{ this.totalResults }} results for the keyword "{{ searchWord }}"
  </div>
  <div class="movie-cards-container" v-if="typeof movies == 'object'">
    <div v-for="movie in movies" :key="movie.imdbID">
      <movie-card :movie="movie"></movie-card>
    </div>
  </div>
  <div class="no-result" v-else>
    No Result found for "{{ searchWord }}", type "{{ type }}"
  </div>
  <pagination
    :totalPages="totalPages"
    :perPage="10"
    :total="totalResults"
    :currentPage="currentPage"
    @pagechanged="onPageChange"
    v-show="typeof movies == 'object'"
  ></pagination>
</template>

<script>
import Pagination from "./Pagination.vue";
import SearchMovie from "./SearchMovie.vue";
import MovieCard from "./MovieCard.vue";
import axios from "axios";
export default {
  components: {
    "search-movie": SearchMovie,
    pagination: Pagination,
    "movie-card": MovieCard,
  },
  data() {
    return {
      movies: null,
      currentPage: 1,
      totalResults: 0,
      totalPages: 0,
      counter: 0,
      type: null,
    };
  },
  watch: {
    searchWord() {
      this.onPageChange(1, this.searchWord);
    },
  },
  computed: {
    searchWord() {
      this.onPageChange(1, this.$store.state.searchedMovie);
      return this.$store.state.searchedMovie;
    },
  },
  methods: {
    onPageChange(page, searchWord) {
      this.movies = [];
      if (searchWord != null) {
        console.log(this.type);
        axios
          .get(
            `https://www.omdbapi.com/?s=${searchWord}&type=${this.type}&page=${page}&apikey=fd9ff0fe`
          )
          .then((response) => {
            console.log(response);
            if (response.data.Response != "False") {
              this.movies = response.data.Search;
              this.totalResults = parseInt(response.data.totalResults);
              this.totalPages = Math.ceil(
                parseInt(response.data.totalResults) / 10
              );
              this.currentPage = page;
            } else {
              this.movies = response.data.Error;
            }
          })
          .then(() => {
            document.documentElement.scrollTop = 0;
            document.getElementsByClassName("count-result")[0].style.display =
              "block";
            document.getElementsByClassName("pagination")[0].style.display =
              "block";
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  // mounted() {
  //   this.onPageChange(1, this.$store.state.searchedMovie);
  // },
};
</script>

<style lang="less" scoped>
.search-section {
  text-align: center;
  h2.search-text {
    text-align: center;
  }
  input {
    width: 25%;
  }
}
.filters {
  float: right;
  margin: 0 30px;
  font-size: 20px;
}
.count-result {
  padding: 20px;
  margin-top: 20px;
  font-size: 24px;
  display: none;
}
.movie-cards-container {
  margin: 20px;
  display: grid;
  grid-template-columns: auto auto auto auto;
}
.no-result {
  text-align: center;
  font-size: 35px;
  color: #af0404;
  margin: 40px 0;
  padding: 40px 0;
}
</style>
