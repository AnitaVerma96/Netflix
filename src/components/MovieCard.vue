<template>
  <div class="movie-card" @mouseover="getMovieDetailOnHover()">
    <router-link v-bind:to="'/movie/' + movie.imdbID">
      <img v-bind:src="movie.Poster" v-bind:alt="movie.Title" />
      <div class="type">{{ movie.Type }}</div>
      <div class="title">{{ movie.Title }}</div>
      <div class="on-hover-detail">
        <div class="movie-year">
          <div class="plot">movies detail:{{ movieDetails.Plot }}</div>
          <div class="year">{{ movieDetails.Year }}</div>
          <div class="duration">
            movies time duration{{ movieDetails.Duration }}
            <div></div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    movie: {},
  },
  data() {
    return {
      movieDetails: {},
    };
  },
  methods: {
    getMovieDetailOnHover() {
      axios
        .get(`https://www.omdbapi.com/?i=${this.movie.imdbID}&apikey=fd9ff0fe`)
        .then((response) => {
          this.movieDetails = response.data;
        })
        .then(() => {
          if (this.movieDetails.Runtime === "N/A") {
            this.movieDetails.Duration = "Not available";
          } else {
            var n = parseInt(this.movieDetails.Runtime);
            var minutes = n % 60;
            var hours = (n - minutes) / 60;
            this.movieDetails.Duration = hours + " h " + minutes + " min";
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="less" scoped>
.movie-card {
  margin-right: 20px;
  height: 500px;
  position: relative;
  transition: 0.5s all ease;
  &:hover {
    transform: scale(1.1);
    border: 1px solid red;
    border-radius: 20px;
    z-index: 999;
    margin-right: 0;
    .on-hover-detail {
      display: block;
    }
    .movie-year {
    }
  }
  a {
    text-decoration: none;
    img {
      height: 400px;
      width: 350px;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
    }
    .type {
      position: absolute;
      top: 0;
      left: 0;
      margin-top: 0;
      box-shadow: 4px 4px 10px 0px grey;
      border-radius: 20px;
      margin-left: 2px;
      justify-content: center;
      border-bottom: 5px solid black;
      border-right: 5px solid black;
      padding: 5px 10px;
      text-transform: capitalize;
    }

    .title {
      text-align: center;
      font-weight: bold;
      color: #af0404;
      text-decoration: none;
      font-size: 20px;
    }
    .on-hover-detail {
      display: none;
    }

    .duration {
      display: inline;
    }
  }
}
</style>
