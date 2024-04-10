<template>
  <div id="movie-name">{{ movieDetail.Title }}</div>
  <div class="moviesimg">
  <img v-bind:src="movieDetail.Poster" v-bind:alt="movieDetail.Title" />
  </div>
  <div class="title">
  <div>imdb rating: {{ movieDetail.imdbRating }}</div>
  <div>runtime: {{ movieDetail.Runtime }}</div>
  <div>Released year: {{ movieDetail.Year }}</div>
  <div>Director: {{ movieDetail.Director }}</div>
  <div>Starring: {{ movieDetail.Actors }}</div>
  <div>Genre: {{ movieDetail.Genre }}</div>
  <div>Languages: {{ movieDetail.Language }}</div>
  <div>{{ movieDetail.Plot }}</div>
  </div>
  <div id="review-section">
    <form id="ratingForm" v-show="!isReviewed">
      <fieldset class="rating">
        <legend>Please rate:</legend>
        <input
          type="radio"
          id="star5"
          name="rating"
          value="5"
          v-model="movieReview.rating"
        />
        <label for="star5" title="Rocks!">5 stars</label>
        <input
          type="radio"
          id="star4"
          name="rating"
          value="4"
          v-model="movieReview.rating"
        />
        <label for="star4" title="Pretty good">4 stars</label>
        <input
          type="radio"
          id="star3"
          name="rating"
          value="3"
          v-model="movieReview.rating"
        />
        <label for="star3" title="Meh">3 stars</label>
        <input
          type="radio"
          id="star2"
          name="rating"
          value="2"
          v-model="movieReview.rating"
        />
        <label for="star2" title="Kinda bad">2 stars</label>
        <input
          type="radio"
          id="star1"
          name="rating"
          value="1"
          v-model="movieReview.rating"
        />
        <label for="star1" title="Very bad">1 star</label>
      </fieldset>
      <textarea class="review-text" v-model="movieReview.reviewText"></textarea>
      <button v-on:click.prevent="submitReview">Submit review</button>
    </form>
    <div id="review-details" v-show="isReviewed">
      <p class="review-details__rating">
        You rated this movie a "{{ this.movieReview.rating }}" out of "5"
      </p>
      <p class="review-details__review-text">
        Your review:
        {{ this.movieReview.reviewText }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params.id,
      movieReview: {
        name: "",
        rating: "",
        reviewText: "",
      },
      movieDetail: {},
      isReviewed: false,
    };
  },
  methods: {
    getMovieDetails() {
      axios
        .get(`https://www.omdbapi.com/?i=${this.id}&plot=full&apikey=fd9ff0fe`)
        .then((response) => {
          this.movieDetail = response.data;
        })
        .then(() => {
          this.movieReview.name = this.movieDetail.Title;
          let stateReviews = this.$store.state.reviews;
          Object.keys(stateReviews).forEach((key) => {
            if (stateReviews[key].name === this.movieDetail.Title) {
              this.isReviewed = true;
              this.movieReview.name = stateReviews[key].name;
              this.movieReview.rating = stateReviews[key].rating;
              this.movieReview.reviewText = stateReviews[key].reviewText;
            }
          });
        })
        .catch((error) => console.log(error));
    },
    submitReview() {
      this.$store.commit("pushReview", this.movieReview);
      this.isReviewed = true;
    },
  },
  mounted() {
    this.getMovieDetails();
  },
};
</script>

<style lang="less" scoped>
#review-section {
  .rating {
    float: left;

    &:not(:checked) > input {
      position: absolute;
      top: -9999px;
      clip: rect(0, 0, 0, 0);
    }

    &:not(:checked) > label {
      float: right;
      width: 1em;
      padding: 0 0.1em;
      overflow: hidden;
      white-space: nowrap;
      cursor: pointer;
      font-size: 200%;
      line-height: 1.2;
      color: #ddd;
      text-shadow: 1px 1px #bbb, 2px 2px #666,
        0.1em 0.1em 0.2em rgba(0, 0, 0, 0.5);
      &:before {
        content: "★ ";
      }
    }

    & > input:checked ~ label {
      color: #f70;
      text-shadow: 1px 1px #c60, 2px 2px #940,
        0.1em 0.1em 0.2em rgba(0, 0, 0, 0.5);
    }

    &:not(:checked) > label:hover,
    &:not(:checked) > label:hover ~ label {
      color: gold;
      text-shadow: 1px 1px goldenrod, 2px 2px #b57340,
        0.1em 0.1em 0.2em rgba(0, 0, 0, 0.5);
    }

    & > input:checked + label:hover,
    & > input:checked + label:hover ~ label,
    & > input:checked ~ label:hover,
    & > input:checked ~ label:hover ~ label,
    & > label:hover ~ input:checked ~ label {
      color: #ea0;
      text-shadow: 1px 1px goldenrod, 2px 2px #b57340,
        0.1em 0.1em 0.2em rgba(0, 0, 0, 0.5);
    }

    & > label:active {
      position: relative;
      top: 2px;
      left: 2px;
    }
  }
   
}

</style>
