import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      searchStrings: ["all", "hum", "any", "some", "tere", "main"],
      reviews: [],
      searchedMovie: null,
    };
  },
  mutations: {
    pushReview(state, review) {
      state.reviews.push(review);
    },
    searchedMovieString(state, searchedText) {
      state.searchedMovie = searchedText;
    },
  },
});

export default store;
